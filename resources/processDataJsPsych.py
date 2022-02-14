#!/usr/bin/env python3
"""Process data collected via jsPsych.

Takes the name of a project and  looks for files starting with the project name
and ending in -*.csv in the  current directory.  First it concatenates all such
files into a temporary  file, discarded when the script is  done.  If given the
name of  an existing file,  don't concatenate and work  on that file.   Then it
expands response cells  with more than one answered question  in them, breaking
them into multiple rows.  One row  is created for each answer, duplicating data
from other  columns in that row.   New rows' question identifier  is taken from
the original row, indexed with the order in which answers were given.  So this:

questionId      responses               otherColumn
some_question   {Q0: "one", Q1: "two"}  data

becomes this:

questionId      responses               otherColumn
some_question.1 one                     data
some_question.2 two                     data

The argument  --prefix determines how  individual answers in  a multiple-answer
cell are indexed.   It is "Q" by  default as in the example  above.  The script
also introduces NA for empty responses, and strips all unnecessary quoting from
the entire table.

Usage:
  processDataJsPsych.py <project_or_file> [-hfc] [-p <prefix>] [-o <output>]
                        [-q <question>] [-r <responses>]

Options:
  -h, --help                  Show this screen
  -f, --force                 Don't ask for confirmation to overwrite existing
                              <output> file
  -c, --concatenate-only      Only concatenate files, don't process multiple
                              answer questions
  -p, --prefix <prefix>       Prefix found in each answer in complex question
                              [default: Q]
  -o, --output <output>       Output file name [default: data-<project>.csv]
  -q, --question <question>   The column to look for question identifier
                              [default: questionId]
  -r, --responses <responses> The column to look for responses
                              [default: responses]

"""
from __future__ import print_function
import docopt
import csv
import json
import os.path
import tempfile
import glob
import sys
import shutil




class jsPsychCSVError(Exception):
    "Exception raised for errors in jsPsych csv file."

    def __init__(self, column, message):
        self.column = column
        self.message = message


def expand_responses(sourceFileName, outputFileName, responsesId, questionsId,
                     questionPrefix):
    """Expand a multiple-answer column in a jsPsych csv.

Read a csv data file created by jsPsych, look for response cells with multiple
answers in a particular column, break that row into multiple rows, one for each
answer, indexing a provided identifier column.

    """
    try:
        sourceF = open(sourceFileName, mode='r')
    except (IOError, OSError):
        print("Error: cannot open input file", sourceFileName)
        sys.exit(2)
    table = list(csv.reader(sourceF, delimiter=',', quotechar='"'))
    # the first row defines the header of the table
    header = table[0]

    if responsesId in header:
        responsesAt = header.index(responsesId)
    else:
        sourceF.close()
        raise jsPsychCSVError("responses", "cannot find responses column")

    if questionsId in header:
        questionsAt = header.index(questionsId)
    else:
        sourceF.close()
        raise jsPsychCSVError("questions", "cannot find questions column")

    try:
        outputF = open(outputFileName, mode='w')
    except (IOError, OSError):
        print("Error: cannot open output file", outputFileName)
        sys.exit(2)
    output = csv.writer(
        outputF, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)

    for row in table:
        if row[responsesAt] == "{}" or row[responsesAt] == "":
            newRow = list(row)
            newRow[responsesAt] = "NA"
            output.writerow(newRow)
        else:
            if row[responsesAt].find('{"' + questionPrefix + '0":') == -1:
                # there is only one answer and it isn't json formatted so
                # nothing to change
                output.writerow(row)
            else:
                # read the answers cell as a property list
                current = json.loads(row[responsesAt])
                if len(current) == 1:
                    # single response, extract content from the json wrapper
                    row[responsesAt] = current[questionPrefix + '0']
                    output.writerow(row)
                else:
                    # multiple responses
                    for n in range(0, len(current)):
                        # for each property in the list
                        newRow = list(row)
                        if current[questionPrefix + str(n)] == "":
                            newRow[responsesAt] = "NA"
                        else:
                            newRow[responsesAt] = current[questionPrefix +
                                                          str(n)]
                        newRow[questionsAt] = (
                            newRow[questionsAt] + "." + str(n + 1))
                        output.writerow(newRow)

    sourceF.close()
    outputF.close()


if __name__ == "__main__":
    arguments = docopt.docopt(__doc__)
    projectName = arguments["<project_or_file>"]
    if arguments["--output"] == "data-<project>.csv":
        outputFileName = "data-" + projectName + ".csv"
    else:
        outputFileName = arguments["--output"]
    questionsId = arguments["--question"]
    responsesId = arguments["--responses"]
    force = arguments["--force"]
    if os.path.isfile(projectName):
        fileList = [projectName]
        if arguments["--output"] == "data-<project>.csv":
            outputFileName = ("data-" + os.path.splitext(
                os.path.basename(projectName))[0] + ".csv")
    else:
        fileList = glob.glob(projectName + "-*.csv")
    prefix = arguments["--prefix"]
    concatenate = arguments["--concatenate-only"]

    if len(fileList) == 0:
        print("Error: could find no csv files for project", projectName)
        sys.exit(1)

    if len(fileList) == 1 and concatenate:
        print("Error: nothing to concatenate, only one data file:",
              fileList[0])
        sys.exit(1)

    if os.path.isfile(outputFileName) and not force:
        print("Error: output file", outputFileName,
              "already exists, use -f to overwrite")
        sys.exit(1)

    try:
        with tempfile.NamedTemporaryFile(mode='r+') as tmpFile:
            try:
                with open(fileList[0], 'r') as firstFile:
                    tmpFile.write(firstFile.readline())
                for currentFileName in fileList:
                    with open(currentFileName, 'r') as currentFile:
                        next(currentFile)
                        for line in currentFile:
                            tmpFile.write(line)
            except (IOError, OSError) as err:
                print(
                    "Error: could not read file ",
                    err.filename,
                    ", check permissions.",
                    sep="")
                sys.exit(2)
            tmpFile.seek(0)
            if concatenate:
                try:
                    with open(outputFileName, 'w') as outputFile:
                        shutil.copyfileobj(tmpFile, outputFile)
                except (IOError, OSError):
                    print("Error: could not write output file", outputFileName)
                    sys.exit(2)
            else:
                expand_responses(tmpFile.name, outputFileName, responsesId,
                                 questionsId, prefix)
    except (IOError, OSError):
        print("Error: could not create temporary file")
        sys.exit(2)
    except jsPsychCSVError as err:
        print("Error:", err.message)
        sys.exit(1)
