---
title: Git workflows
date: April 1, 2019
css: ../styling/github.css
---

## Starting a project
- unix permissions can be a nightmare, so you should follow this script
  carefully

- the strategy is to crerate a bare repository for the new project at
  `/home/smascarenhas/lab/` first of all, by logging on to the server,
  navigating to `/home/smascarenhas/lab/`, and proceeding as follows

```bash
mkdir <project name>.git
cd <project name>.git
git init --bare --shared=group
chgrp -R masc-lab ./
```

- then you clone the project locally

- set up `.gitignore` at least with the following
  - `.DS_Store`
  - `**/*.log`
  - `**/log/`
  - `resources`

- alternatively, you can copy a fuller `.gitignore` from another project

- commit the `.gitignore` locally and push the initial-state commit, thus:

```bash
git add .gitignore
git commit -m "Fresh repository"
git push
```

## Cloning a project
```bash
git clone <username>@web-risc.ens.fr:/home/smascarenhas/lab/<project name>.git <destination folder>
```

## Working on a project
- find a natural stopping point, don't do a big dump of changes at the end of a
  workday

- try to keep your commits internally cohesive

- remember you can edit `.gitignore`: we don't want to version track stuff that
  doesn't need to be tracked (derived pdfs, temp files, etc)

- keep in mind that `.gitignore` is version tracked

## Compiling this file
```bash
pandoc git-workflows.md --from markdown+smart -o git-workflows.html --standalone
```
