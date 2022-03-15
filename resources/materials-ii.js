// this is an array with all of the materials to be presented, order doesn't
// matter since this will be randomized.  each item needs a unique ID

var targets_left = [
  // John is allowed to steal from the rich and give to the poor.
  // John stole from the rich and did not give to the poor.
  { subject: "John",
    verb: "is allowed to",
    VP1_infi: "steal from the rich",
    VP2_infi: "give to the poor",
    VP1_infl: "stole from the rich",
    VP2_infl: "gave to the poor",
    VP1_part: "stolen from the rich",
    VP2_part: "given to the poor",
    id: "target.1",
    nickname: "rich-poor",
    modal: "deontic",
    expect: 0
  },

  // Daniel is allowed to skip a day of work and go to a march in Washington
  // Daniel skipped a day of work and did not go to a march in Washington
  { subject: "Daniel",
    verb: "might",
    VP1_infi: "skip a day of work",
    VP2_infi: "go to a march in Washington",
    VP1_infl: "skipped a day of work",
    VP2_infl: "went to a march in Washington",
    VP1_part: "skipped a day of work",
    VP2_part: "gone to a march in Washington",
    id: "target.2",
    nickname: "work-march",
    modal: "epistemic",
    expect: 0
  },

  // George is allowed to skip afternoon classes and attend team practice
  // George skipped afternoon classes and did not attend team practice
  { subject: "George",
    verb: "is allowed to",
    VP1_infi: "skip afternoon classes",
    VP2_infi: "attend team practice",
    VP1_infl: "skipped afternoon classes",
    VP2_infl: "attended team practice",
    VP1_part: "skipped afternoon classes",
    VP2_part: "attended team practice",
    id: "target.3",
    nickname: "classes-practice",
    modal: "deontic",
    expect: 0
  },



  // Audrey is allowed to go to the mall and buy a book
  // Audrey went to the mall and bought a book
  { subject: "Audrey",
    verb: "might",
    VP1_infi: "go to the mall",
    VP2_infi: "buy a book",
    VP1_infl: "went to the mall",
    VP2_infl: "bought a book",
    VP1_part: "gone to the mall",
    VP2_part: "bought a book",
    id: "target.4",
    nickname: "mall-book",
    modal: "epistemic",
    expect: 0
  },

  // Linda is allowed to leave the base and call her parents
  // Linda left the base and did not call her parents
  { subject: "Linda",
    verb: "is allowed to",
    VP1_infi: "leave the base",
    VP2_infi: "call her parents",
    VP1_infl: "left the base",
    VP2_infl: "called her parents",
    VP1_part: "left the base",
    VP2_part: "called her parents",
    id: "target.5",
    nickname: "base-call",
    modal: "deontic",
    expect: 0
  },

  // Riley is allowed to take Mary's car and go grocery shopping
  // Riley took Mary's car and did not go grocery shopping
  { subject: "Riley",
    verb: "might",
    VP1_infi: "take Mary's car",
    VP2_infi: "go grocery shopping",
    VP1_infl: "took Mary's car",
    VP2_infl: "went grocery shopping",
    VP1_part: "taken Mary's car",
    VP2_part: "gone grocery shopping",
    id: "target.6",
    nickname: "car-groceries",
    modal: "epistemic",
    expect: 0
  },



  // Alexander is allowed to have his friends over and play video games
  // Alexander had his friends over and did not play video games
  { subject: "Alexander",
    verb: "is allowed to",
    VP1_infi: "have his friends over",
    VP2_infi: "play video games",
    VP1_infl: "had his friends over",
    VP2_infl: "played video games",
    VP1_part: "had his friends over",
    VP2_part: "played video games",
    id: "target.7",
    nickname: "friends-play",
    modal: "deontic",
    expect: 0
  },

  { subject: "Bob",
    verb: "might",
    VP1_infi: "go to a bar",
    VP2_infi: "talk to a friend",
    VP1_infl: "went to a bar",
    VP2_infl: "talked to a friend",
    VP1_part: "gone to a bar",
    VP2_part: "talked to a friend",
    id: "target.8",
    nickname: "bar-friend",
    modal: "epistemic",
    expect: 0
  },

  // Sam is allowed to skip school and visit his grandmother in the hospital
  { subject: "Sam",
    verb: "is allowed to",
    VP1_infi: "skip school",
    VP2_infi: "visit his grandmother in the hospital",
    VP1_infl: "skipped school",
    VP2_infl: "visited his grandmother in the hospital",
    VP1_part: "skipped school",
    VP2_part: "visited his grandmother in the hospital",
    id: "target.9",
    nickname: "school-hospital",
    modal: "deontic",
    expect: 0
  },

  // June is allowed to visit her boyfriend and do her homework
  { subject: "June",
    verb: "might",
    VP1_infi: "visit her boyfriend",
    VP2_infi: "do her homework",
    VP1_infl: "visited her boyfriend",
    VP2_infl: "did her homework",
    VP1_part: "visited her boyfriend",
    VP2_part: "done her homework",
    id: "target.10",
    nickname: "boyfriend-homework",
    modal: "epistemic",
    expect: 0
  },

  // Paul is allowed to take his parents' car and pick up dinner
  { subject: "Paul",
    verb: "is allowed to",
    VP1_infi: "take his parents' car",
    VP2_infi: "pick up dinner",
    VP1_infl: "took his parents' car",
    VP2_infl: "picked up dinner",
    VP1_part: "taken his parents' car",
    VP2_part: "picked up dinner",
    id: "target.11",
    nickname: "car-dinner",
    modal: "deontic",
    expect: 0
  },

  // Jeremy is allowed to leave school and get a job
  { subject: "Jeremy",
    verb: "might",
    VP1_infi: "leave school",
    VP2_infi: "get a job",
    VP1_infl: "left school",
    VP2_infl: "got a job",
    VP1_part: "left school",
    VP2_part: "gotten a job",
    id: "target.12",
    nickname: "school-job",
    modal: "epistemic",
    expect: 0
  },

];

var targets_right = [


  // John is allowed to stay at school till late and use the library
  { subject: "John",
    verb: "is allowed to",
    VP1_infi: "stay at school till late",
    VP2_infi: "use the library",
    VP1_infl: "stayed at school till late",
    VP2_infl: "used the library",
    VP1_part: "stayed at school till late",
    VP2_part: "used the library",
    id: "target.13",
    modal: "deontic",
    nickname: "school-library",
    expect: 0
  },

  // Thomas is allowed to take a painkiller and call a friend
  { subject: "Thomas",
    verb: "might",
    VP1_infi: "take a painkiller",
    VP2_infi: "call a friend",
    VP1_infl: "took a painkiller",
    VP2_infl: "called a friend",
    VP1_part: "taken a painkiller",
    VP2_part: "called a friend",
    id: "target.14",
    nickname: "painkiller-friend",
    modal: "epistemic",
    expect: 0
  },


    // Bill is allowed to go fishing and cook dinner
    { subject: "Bill",
      verb: "is allowed to",
      VP1_infi: "go fishing",
      VP2_infi: "cook dinner",
      VP1_infl: "went fishing",
      VP2_infl: "cooked dinner",
      VP1_part: "gone fishing",
      VP2_part: "cooked dinner",
      id: "target.15",
      nickname: "fishing-dinner",
      modal: "deontic",
      expect: 0
    },

    // James is allowed to join the army and study medicine
    { subject: "James",
      verb: "might",
      VP1_infi: "join the army",
      VP2_infi: "study medicine",
      VP1_infl: "joined the army",
      VP2_infl: "studied medicine",
      VP1_part: "joined the army",
      VP2_part: "studied medicine",
      id: "target.16",
      nickname: "army-medicine",
      modal: "epistemic",
      expect: 0
    },

    // Peter is allowed to call Mary and invite her mother
    // Peter called Mary and did not invite her mother
    { subject: "Peter",
      verb: "is allowed to",
      VP1_infi: "call Mary",
      VP2_infi: "invite Mary to church",
      VP1_infl: "called Mary",
      VP2_infl: "invited Mary to church",
      VP1_part: "called Mary",
      VP2_part: "invited Mary to church",
      id: "target.17",
      nickname: "call-church",
      modal: "deontic",
      expect: 0
    },

    // Heather is allowed to buy a lottery ticket and sell her car
    // Heather bought a lottery ticket and did not sell her car
    { subject: "Heather",
      verb: "might",
      VP1_infi: "buy a lottery ticket",
      VP2_infi: "sell her car",
      VP1_infl: "bought a lottery ticket",
      VP2_infl: "sold her car",
      VP1_part: "bought a lottery ticket",
      VP2_part: "sold her car",
      id: "target.18",
      nickname: "lottery-car",
      modal: "epistemic",
      expect: 0
    },

    // Laura is allowed to go to a concert and drink beer
    { subject: "Laura",
      verb: "is allowed to",
      VP1_infi: "go to a concert",
      VP2_infi: "drink beer",
      VP1_infl: "went to a concert",
      VP2_infl: "drank beer",
      VP1_part: "gone to a concert",
      VP2_part: "drunken beer",
      id: "target.19",
      nickname: "concert-beer",
      modal: "deontic",
      expect: 0
    },

    // Charlotte is allowed to take the bus and go to the dentist
    { subject: "Charlotte",
      verb: "might",
      VP1_infi: "take the bus",
      VP2_infi: "go to the dentist",
      VP1_infl: "took the bus",
      VP2_infl: "went to the dentist",
      VP1_part: "taken the bus",
      VP2_part: "gone to the dentist",
      id: "target.20",
      nickname: "bus-dentist",
      modal: "epistemic",
      expect: 0
    },

    // Brittany is allowed to go to France in summer and sell her guitar
    { subject: "Brittany",
      verb: "is allowed to",
      VP1_infi: "go to France in the summer",
      VP2_infi: "sell her guitar",
      VP1_infl: "went to France in the summer ",
      VP2_infl: "sold her guitar",
      VP1_part: "gone to France in the summer",
      VP2_part: "sold her guitar",
      id: "target.21",
      nickname: "france-guitar",
      modal: "deontic",
      expect: 0
    },

    // Owen is allowed to go to a baseball game and apply for a job
    // Owen went to a baseball game and applied for a job
    { subject: "Owen",
      verb: "might",
      VP1_infi: "go to a baseball game",
      VP2_infi: "apply for a job",
      VP1_infl: "went to a baseball game",
      VP2_infl: "applied for a job",
      VP1_part: "gone to a baseball game",
      VP2_part: "applied for a job",
      id: "target.22",
      nickname: "baseball-job",
      modal: "epistemic",
      expect: 0
    },

    // Jean is allowed to run a marathon and buy tickets for the super bowl
    // Jean is ran a marathon and bought tickets for the super bowl
    { subject: "Jean",
      verb: "is allowed to",
      VP1_infi: "run a marathon",
      VP2_infi: "buy tickets for the super bowl",
      VP1_infl: "ran a marathon",
      VP2_infl: "bought tickets for the super bowl",
      VP1_part: "run a marathon",
      VP2_part: "bought tickets for the super bowl",
      id: "target.23",
      nickname: "marathon-superbowl",
      modal: "deontic",
      expect: 0
    },

    // Nathan is allowed to open a bank account and get a SIM card
    { subject: "Nathan",
      verb: "might",
      VP1_infi: "open a bank account",
      VP2_infi: "get a SIM card",
      VP1_infl: "opened a bank account",
      VP2_infl: "got a SIM card",
      VP1_part: "opened a bank account",
      VP2_part: "gotten a SIM card",
      id: "target.24",
      nickname: "bank-simcard",
      modal: "epistemic",
      expect: 0
    },


];
