import { useState } from 'react'
import './App.css'
import PostCard from './components/PostCard'
import type { Post } from './components/PostCard'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onCreate: () => void
}

type FeedProps = {
  posts: Post[]
}

const initialPosts: Post[] = [
  {
    id: '1',
    name: 'Avery',
    text: 'working on a calendar early this morning',
    time: '5m ago',
    iamCount: 41,
  },
  {
    id: '2',
    name: 'Jordan',
    text: 'trying to finish a draft',
    time: 'last night',
    iamCount: 41,
  },
  {
    id: '3',
    name: 'Riley',
    text: 'working on a proposal on a random weekday',
    time: 'last night',
    iamCount: 145,
  },
  {
    id: '4',
    name: 'Casey',
    text: 'working on a calendar between meetings',
    time: 'this morning',
    iamCount: 60,
  },
  {
    id: '5',
    name: 'Morgan',
    text: 'working on a side project on a saturday',
    time: 'earlier today',
    iamCount: 0,
  },
  {
    id: '6',
    name: 'Taylor',
    text: 'avoiding a playlist and feeling tired',
    time: 'last night',
    iamCount: 30,
  },
  {
    id: '7',
    name: 'Quinn',
    text: 'working on a plan with a half-finished mug of tea',
    time: '18m ago',
    iamCount: 55,
  },
  {
    id: '8',
    name: 'Parker',
    text: 'sitting in the car feeling calm',
    time: '18m ago',
    iamCount: 10,
  },
  {
    id: '9',
    name: 'Reese',
    text: 'trying to clean up a sketch',
    time: 'just now',
    iamCount: 85,
  },
  {
    id: '10',
    name: 'Rowan',
    text: 'working on a draft while it rains',
    time: '25m ago',
    iamCount: 130,
  },
  {
    id: '11',
    name: 'Emery',
    text: 'avoiding a cover letter and feeling a bit foggy',
    time: 'last night',
    iamCount: 96,
  },
  {
    id: '12',
    name: 'Skyler',
    text: 'sitting in the corner of the room feeling restless',
    time: '25m ago',
    iamCount: 41,
  },
  {
    id: '13',
    name: 'Drew',
    text: 'avoiding a report and feeling overwhelmed',
    time: 'a few minutes ago',
    iamCount: 41,
  },
  {
    id: '14',
    name: 'Blake',
    text: 'sitting in the back porch feeling not fully here',
    time: 'last night',
    iamCount: 96,
  },
  {
    id: '15',
    name: 'Hayden',
    text: 'working on a checklist late at night',
    time: 'yesterday',
    iamCount: 34,
  },
  {
    id: '16',
    name: 'Cameron',
    text: 'avoiding a cover letter and feeling bored',
    time: '12m ago',
    iamCount: 25,
  },
  {
    id: '17',
    name: 'Finley',
    text: 'lying in bed re-reading messages',
    time: 'just now',
    iamCount: 15,
  },
  {
    id: '18',
    name: 'Logan',
    text: 'watching a show and not really paying attention',
    time: 'a few minutes ago',
    iamCount: 85,
  },
  {
    id: '19',
    name: 'Sidney',
    text: 'working on a budget on a saturday',
    time: 'yesterday',
    iamCount: 145,
  },
  {
    id: '20',
    name: 'Marley',
    text: 'sitting in my desk feeling quiet',
    time: 'yesterday',
    iamCount: 25,
  },
  {
    id: '21',
    name: 'Dakota',
    text: 'avoiding a checklist and feeling calm',
    time: 'a few minutes ago',
    iamCount: 34,
  },
  {
    id: '22',
    name: 'Harper',
    text: 'sitting at the corner of the room and trying to focus',
    time: 'yesterday',
    iamCount: 130,
  },
  {
    id: '23',
    name: 'Sage',
    text: 'working on a to-do list while the house is quiet',
    time: 'yesterday',
    iamCount: 145,
  },
  {
    id: '24',
    name: 'River',
    text: 'avoiding a report and feeling distracted',
    time: 'last night',
    iamCount: 41,
  },
  {
    id: '25',
    name: 'Mason',
    text: 'lying in bed trying to start a tutorial',
    time: 'yesterday',
    iamCount: 30,
  },
  {
    id: '26',
    name: 'Ari',
    text: 'trying to clean up a checklist',
    time: 'earlier today',
    iamCount: 0,
  },
  {
    id: '27',
    name: 'Jamie',
    text: 'avoiding an overdue task and feeling quiet',
    time: 'a few minutes ago',
    iamCount: 18,
  },
  {
    id: '28',
    name: 'Kendall',
    text: 'trying to finish a spreadsheet',
    time: 'just now',
    iamCount: 55,
  },
  {
    id: '29',
    name: 'Lane',
    text: 'watching a documentary and not really paying attention',
    time: '5m ago',
    iamCount: 12,
  },
  {
    id: '30',
    name: 'Toby',
    text: 'working on emails on a saturday',
    time: '5m ago',
    iamCount: 34,
  },
  {
    id: '31',
    name: 'Noah',
    text: 'working on a budget while the coffee brews',
    time: '25m ago',
    iamCount: 3,
  },
  {
    id: '32',
    name: 'Mila',
    text: 'watching a show and not really paying attention',
    time: 'earlier today',
    iamCount: 2,
  },
  {
    id: '33',
    name: 'Lena',
    text: 'working on a cover letter before work',
    time: '25m ago',
    iamCount: 96,
  },
  {
    id: '34',
    name: 'Owen',
    text: 'sitting at the spare room and trying to focus',
    time: '25m ago',
    iamCount: 110,
  },
  {
    id: '35',
    name: 'Ivy',
    text: 'lying in bed scrolling messages',
    time: 'this morning',
    iamCount: 15,
  },
  {
    id: '36',
    name: 'Eli',
    text: 'scrolling a stack of papers instead of sleeping',
    time: 'last night',
    iamCount: 8,
  },
  {
    id: '37',
    name: 'Nora',
    text: 'sitting at the backyard and trying to focus',
    time: '25m ago',
    iamCount: 130,
  },
  {
    id: '38',
    name: 'Zoey',
    text: 'avoiding a proposal and feeling distracted',
    time: 'a few minutes ago',
    iamCount: 0,
  },
  {
    id: '39',
    name: 'Luca',
    text: 'sitting in the kitchen table feeling tired',
    time: 'last night',
    iamCount: 1,
  },
  {
    id: '40',
    name: 'Aria',
    text: 'working on a proposal while everyone is out',
    time: 'yesterday',
    iamCount: 10,
  },
  {
    id: '41',
    name: 'Maya',
    text: 'avoiding a cover letter and feeling fine',
    time: '18m ago',
    iamCount: 85,
  },
  {
    id: '42',
    name: 'Theo',
    text: 'working on a new routine with the window open',
    time: 'a few minutes ago',
    iamCount: 1,
  },
  {
    id: '43',
    name: 'June',
    text: 'sitting at the backyard and trying to focus',
    time: '18m ago',
    iamCount: 1,
  },
  {
    id: '44',
    name: 'Leah',
    text: 'sitting at the floor and trying to focus',
    time: '5m ago',
    iamCount: 15,
  },
  {
    id: '45',
    name: 'Caleb',
    text: 'working on a calendar after lunch',
    time: 'a few minutes ago',
    iamCount: 0,
  },
  {
    id: '46',
    name: 'Cora',
    text: 'avoiding a long message and feeling a bit foggy',
    time: 'just now',
    iamCount: 8,
  },
  {
    id: '47',
    name: 'Jules',
    text: 'watching a documentary and not really paying attention',
    time: '12m ago',
    iamCount: 72,
  },
  {
    id: '48',
    name: 'Miles',
    text: 'avoiding a playlist and feeling tired',
    time: 'last night',
    iamCount: 22,
  },
  {
    id: '49',
    name: 'Eden',
    text: 'working on a proposal in the middle of the week',
    time: 'a few minutes ago',
    iamCount: 8,
  },
  {
    id: '50',
    name: 'Wren',
    text: 'trying to focus on a cover letter',
    time: 'last night',
    iamCount: 41,
  },
  {
    id: '51',
    name: 'Avery',
    text: 'working on a presentation on a slow afternoon',
    time: 'a few minutes ago',
    iamCount: 0,
  },
  {
    id: '52',
    name: 'Jordan',
    text: 'working on a long message after lunch',
    time: 'earlier today',
    iamCount: 18,
  },
  {
    id: '53',
    name: 'Riley',
    text: 'scrolling a list of tasks instead of sleeping',
    time: '25m ago',
    iamCount: 3,
  },
  {
    id: '54',
    name: 'Casey',
    text: 'scrolling a long thread instead of sleeping',
    time: 'yesterday',
    iamCount: 96,
  },
  {
    id: '55',
    name: 'Morgan',
    text: 'avoiding a budget and feeling fine',
    time: 'yesterday',
    iamCount: 2,
  },
  {
    id: '56',
    name: 'Taylor',
    text: 'working on a spreadsheet before work',
    time: '12m ago',
    iamCount: 55,
  },
  {
    id: '57',
    name: 'Quinn',
    text: 'sitting in the corner of the room feeling restless',
    time: 'earlier today',
    iamCount: 48,
  },
  {
    id: '58',
    name: 'Parker',
    text: 'sitting at the balcony and trying to focus',
    time: 'earlier today',
    iamCount: 3,
  },
  {
    id: '59',
    name: 'Reese',
    text: 'sitting at the office and trying to focus',
    time: 'a few minutes ago',
    iamCount: 110,
  },
  {
    id: '60',
    name: 'Rowan',
    text: 'trying to write a draft',
    time: 'a few minutes ago',
    iamCount: 18,
  },
  {
    id: '61',
    name: 'Emery',
    text: 'working on a presentation after lunch',
    time: '5m ago',
    iamCount: 4,
  },
  {
    id: '62',
    name: 'Skyler',
    text: 'lying in bed catching up on a stack of papers',
    time: 'a few minutes ago',
    iamCount: 25,
  },
  {
    id: '63',
    name: 'Drew',
    text: 'working on a budget in the middle of the week',
    time: 'yesterday',
    iamCount: 2,
  },
  {
    id: '64',
    name: 'Blake',
    text: 'sitting at the corner of the room and trying to focus',
    time: '25m ago',
    iamCount: 55,
  },
  {
    id: '65',
    name: 'Hayden',
    text: 'working on a draft on a sunday',
    time: '25m ago',
    iamCount: 15,
  },
  {
    id: '66',
    name: 'Cameron',
    text: 'working on emails with the window open',
    time: 'just now',
    iamCount: 3,
  },
  {
    id: '67',
    name: 'Finley',
    text: 'working on a long message with the window open',
    time: '18m ago',
    iamCount: 5,
  },
  {
    id: '68',
    name: 'Logan',
    text: 'working on a budget before work',
    time: '12m ago',
    iamCount: 130,
  },
  {
    id: '69',
    name: 'Sidney',
    text: 'working on a sketch on a slow afternoon',
    time: 'last night',
    iamCount: 55,
  },
  {
    id: '70',
    name: 'Marley',
    text: 'sitting at the balcony and trying to focus',
    time: 'this morning',
    iamCount: 3,
  },
  {
    id: '71',
    name: 'Dakota',
    text: 'sitting in the couch feeling a little stuck',
    time: 'earlier today',
    iamCount: 0,
  },
  {
    id: '72',
    name: 'Harper',
    text: 'working on an overdue task while it rains',
    time: '25m ago',
    iamCount: 34,
  },
  {
    id: '73',
    name: 'Sage',
    text: 'scrolling news instead of sleeping',
    time: 'last night',
    iamCount: 2,
  },
  {
    id: '74',
    name: 'River',
    text: 'lying in bed scrolling photos',
    time: 'this morning',
    iamCount: 8,
  },
  {
    id: '75',
    name: 'Mason',
    text: 'watching a documentary and not really paying attention',
    time: 'yesterday',
    iamCount: 41,
  },
  {
    id: '76',
    name: 'Ari',
    text: 'lying in bed cleaning up tabs',
    time: '12m ago',
    iamCount: 15,
  },
  {
    id: '77',
    name: 'Jamie',
    text: 'sitting in the bed feeling distracted',
    time: 'earlier today',
    iamCount: 12,
  },
  {
    id: '78',
    name: 'Kendall',
    text: 'working on emails in the middle of the week',
    time: 'this morning',
    iamCount: 85,
  },
  {
    id: '79',
    name: 'Lane',
    text: 'lying in bed trying to avoid messages',
    time: 'last night',
    iamCount: 18,
  },
  {
    id: '80',
    name: 'Toby',
    text: 'working on a grocery list between meetings',
    time: 'a few minutes ago',
    iamCount: 18,
  },
  {
    id: '81',
    name: 'Noah',
    text: 'working on a long message on a random weekday',
    time: 'a few minutes ago',
    iamCount: 2,
  },
  {
    id: '82',
    name: 'Mila',
    text: 'sitting in the office feeling distracted',
    time: 'just now',
    iamCount: 10,
  },
  {
    id: '83',
    name: 'Lena',
    text: 'scrolling a tutorial instead of sleeping',
    time: '25m ago',
    iamCount: 2,
  },
  {
    id: '84',
    name: 'Owen',
    text: 'working on a grocery list in the quiet hour',
    time: 'just now',
    iamCount: 41,
  },
  {
    id: '85',
    name: 'Ivy',
    text: 'trying to start a cover letter',
    time: '12m ago',
    iamCount: 145,
  },
  {
    id: '86',
    name: 'Eli',
    text: 'lying in bed sorting notes',
    time: 'yesterday',
    iamCount: 5,
  },
  {
    id: '87',
    name: 'Nora',
    text: 'working on a grocery list early this morning',
    time: 'earlier today',
    iamCount: 110,
  },
  {
    id: '88',
    name: 'Zoey',
    text: 'avoiding a grocery list and feeling trying to stay focused',
    time: 'a few minutes ago',
    iamCount: 4,
  },
  {
    id: '89',
    name: 'Luca',
    text: 'sitting in the backyard feeling focused',
    time: 'yesterday',
    iamCount: 130,
  },
  {
    id: '90',
    name: 'Aria',
    text: 'working on an overdue task while everyone is out',
    time: 'earlier today',
    iamCount: 130,
  },
  {
    id: '91',
    name: 'Maya',
    text: 'sitting in the back porch feeling focused',
    time: '25m ago',
    iamCount: 55,
  },
  {
    id: '92',
    name: 'Theo',
    text: 'working on a calendar late at night',
    time: '18m ago',
    iamCount: 96,
  },
  {
    id: '93',
    name: 'June',
    text: 'trying to write a calendar',
    time: 'last night',
    iamCount: 55,
  },
  {
    id: '94',
    name: 'Leah',
    text: 'trying to clean up a side project',
    time: 'yesterday',
    iamCount: 25,
  },
  {
    id: '95',
    name: 'Caleb',
    text: 'lying in bed re-reading messages',
    time: '25m ago',
    iamCount: 85,
  },
  {
    id: '96',
    name: 'Cora',
    text: 'scrolling messages instead of sleeping',
    time: 'just now',
    iamCount: 110,
  },
  {
    id: '97',
    name: 'Jules',
    text: 'lying in bed catching up on notes',
    time: '12m ago',
    iamCount: 4,
  },
  {
    id: '98',
    name: 'Miles',
    text: 'sitting at the back porch and trying to focus',
    time: '25m ago',
    iamCount: 60,
  },
  {
    id: '99',
    name: 'Eden',
    text: 'scrolling news instead of sleeping',
    time: 'a few minutes ago',
    iamCount: 10,
  },
  {
    id: '100',
    name: 'Wren',
    text: 'trying to write a new routine',
    time: '12m ago',
    iamCount: 48,
  },
  {
    id: '101',
    name: 'Avery',
    text: 'trying to finish a new routine',
    time: '18m ago',
    iamCount: 41,
  },
  {
    id: '102',
    name: 'Jordan',
    text: 'trying to focus on a sketch',
    time: 'last night',
    iamCount: 72,
  },
  {
    id: '103',
    name: 'Riley',
    text: 'sitting at the couch and trying to focus',
    time: '18m ago',
    iamCount: 2,
  },
  {
    id: '104',
    name: 'Casey',
    text: 'avoiding a spreadsheet and feeling a little stuck',
    time: 'earlier today',
    iamCount: 48,
  },
  {
    id: '105',
    name: 'Morgan',
    text: 'sitting in a quiet corner feeling restless',
    time: '25m ago',
    iamCount: 15,
  },
  {
    id: '106',
    name: 'Taylor',
    text: 'avoiding a plan and feeling calm',
    time: '12m ago',
    iamCount: 72,
  },
  {
    id: '107',
    name: 'Quinn',
    text: 'working on an overdue task while the house is quiet',
    time: '5m ago',
    iamCount: 60,
  },
  {
    id: '108',
    name: 'Parker',
    text: 'scrolling photos instead of sleeping',
    time: '12m ago',
    iamCount: 30,
  },
  {
    id: '109',
    name: 'Reese',
    text: 'sitting in the spare room feeling low energy',
    time: 'just now',
    iamCount: 96,
  },
  {
    id: '110',
    name: 'Rowan',
    text: 'scrolling a documentary instead of sleeping',
    time: 'earlier today',
    iamCount: 48,
  },
  {
    id: '111',
    name: 'Emery',
    text: 'working on a cover letter late at night',
    time: 'just now',
    iamCount: 12,
  },
  {
    id: '112',
    name: 'Skyler',
    text: 'working on a to-do list on a random weekday',
    time: '5m ago',
    iamCount: 96,
  },
  {
    id: '113',
    name: 'Drew',
    text: 'working on a presentation with the window open',
    time: '18m ago',
    iamCount: 25,
  },
  {
    id: '114',
    name: 'Blake',
    text: 'working on a plan after lunch',
    time: 'earlier today',
    iamCount: 72,
  },
  {
    id: '115',
    name: 'Hayden',
    text: 'trying to clean up an overdue task',
    time: '5m ago',
    iamCount: 55,
  },
  {
    id: '116',
    name: 'Cameron',
    text: 'scrolling a list of tasks instead of sleeping',
    time: '5m ago',
    iamCount: 15,
  },
  {
    id: '117',
    name: 'Finley',
    text: 'sitting at a quiet corner and trying to focus',
    time: 'last night',
    iamCount: 55,
  },
  {
    id: '118',
    name: 'Logan',
    text: 'working on a plan in the middle of the week',
    time: 'yesterday',
    iamCount: 0,
  },
  {
    id: '119',
    name: 'Sidney',
    text: 'working on a budget while the coffee brews',
    time: 'a few minutes ago',
    iamCount: 8,
  },
  {
    id: '120',
    name: 'Marley',
    text: 'working on a sketch during a break',
    time: '12m ago',
    iamCount: 12,
  },
  {
    id: '121',
    name: 'Dakota',
    text: 'sitting at the library and trying to focus',
    time: '25m ago',
    iamCount: 96,
  },
  {
    id: '122',
    name: 'Harper',
    text: 'trying to write a checklist',
    time: '12m ago',
    iamCount: 41,
  },
  {
    id: '123',
    name: 'Sage',
    text: 'scrolling a stack of papers instead of sleeping',
    time: '5m ago',
    iamCount: 8,
  },
  {
    id: '124',
    name: 'River',
    text: 'watching tv and not really paying attention',
    time: 'last night',
    iamCount: 15,
  },
  {
    id: '125',
    name: 'Mason',
    text: 'working on a draft in the middle of the week',
    time: 'just now',
    iamCount: 130,
  },
  {
    id: '126',
    name: 'Ari',
    text: 'working on a to-do list late at night',
    time: '25m ago',
    iamCount: 48,
  },
  {
    id: '127',
    name: 'Jamie',
    text: 'lying in bed watching a tutorial',
    time: '25m ago',
    iamCount: 96,
  },
  {
    id: '128',
    name: 'Kendall',
    text: 'lying in bed avoiding messages',
    time: 'yesterday',
    iamCount: 3,
  },
  {
    id: '129',
    name: 'Lane',
    text: 'trying to focus on a grocery list',
    time: 'this morning',
    iamCount: 55,
  },
  {
    id: '130',
    name: 'Toby',
    text: 'scrolling a show instead of sleeping',
    time: 'a few minutes ago',
    iamCount: 3,
  },
  {
    id: '131',
    name: 'Noah',
    text: 'scrolling a tutorial instead of sleeping',
    time: '18m ago',
    iamCount: 0,
  },
  {
    id: '132',
    name: 'Mila',
    text: 'sitting at a quiet corner and trying to focus',
    time: 'a few minutes ago',
    iamCount: 130,
  },
  {
    id: '133',
    name: 'Lena',
    text: 'avoiding an overdue task and feeling distracted',
    time: 'this morning',
    iamCount: 48,
  },
  {
    id: '134',
    name: 'Owen',
    text: 'scrolling a pile of laundry instead of sleeping',
    time: '25m ago',
    iamCount: 5,
  },
  {
    id: '135',
    name: 'Ivy',
    text: 'trying to finish a checklist',
    time: 'yesterday',
    iamCount: 48,
  },
  {
    id: '136',
    name: 'Eli',
    text: 'working on a long message with the window open',
    time: 'last night',
    iamCount: 25,
  },
  {
    id: '137',
    name: 'Nora',
    text: 'lying in bed catching up on a pile of laundry',
    time: 'a few minutes ago',
    iamCount: 110,
  },
  {
    id: '138',
    name: 'Zoey',
    text: 'working on a grocery list on a saturday',
    time: '18m ago',
    iamCount: 30,
  },
  {
    id: '139',
    name: 'Luca',
    text: 'working on a calendar before work',
    time: 'last night',
    iamCount: 145,
  },
  {
    id: '140',
    name: 'Aria',
    text: 'working on a side project in the quiet hour',
    time: 'a few minutes ago',
    iamCount: 12,
  },
  {
    id: '141',
    name: 'Maya',
    text: 'scrolling photos instead of sleeping',
    time: 'yesterday',
    iamCount: 4,
  },
  {
    id: '142',
    name: 'Theo',
    text: 'trying to clean up a spreadsheet',
    time: '25m ago',
    iamCount: 34,
  },
  {
    id: '143',
    name: 'June',
    text: 'avoiding a cover letter and feeling tired',
    time: '25m ago',
    iamCount: 3,
  },
  {
    id: '144',
    name: 'Leah',
    text: 'watching a show and not really paying attention',
    time: '5m ago',
    iamCount: 2,
  },
  {
    id: '145',
    name: 'Caleb',
    text: 'trying to write a spreadsheet',
    time: '12m ago',
    iamCount: 110,
  },
  {
    id: '146',
    name: 'Cora',
    text: 'working on an overdue task on a slow afternoon',
    time: '25m ago',
    iamCount: 8,
  },
  {
    id: '147',
    name: 'Jules',
    text: 'avoiding a new routine and feeling distracted',
    time: '18m ago',
    iamCount: 12,
  },
  {
    id: '148',
    name: 'Miles',
    text: 'working on a checklist with the tv on',
    time: 'yesterday',
    iamCount: 48,
  },
  {
    id: '149',
    name: 'Eden',
    text: 'avoiding a spreadsheet and feeling not fully here',
    time: 'just now',
    iamCount: 15,
  },
  {
    id: '150',
    name: 'Wren',
    text: 'avoiding an overdue task and feeling restless',
    time: 'earlier today',
    iamCount: 130,
  },
  {
    id: '151',
    name: 'Avery',
    text: 'sitting in the back porch feeling overwhelmed',
    time: 'yesterday',
    iamCount: 5,
  },
  {
    id: '152',
    name: 'Jordan',
    text: 'trying to write a new routine',
    time: '25m ago',
    iamCount: 110,
  },
  {
    id: '153',
    name: 'Riley',
    text: 'sitting in a quiet corner feeling restless',
    time: 'a few minutes ago',
    iamCount: 10,
  },
  {
    id: '154',
    name: 'Casey',
    text: 'working on a presentation while it rains',
    time: 'a few minutes ago',
    iamCount: 30,
  },
  {
    id: '155',
    name: 'Morgan',
    text: 'sitting in my desk feeling half awake',
    time: '25m ago',
    iamCount: 2,
  },
  {
    id: '156',
    name: 'Taylor',
    text: 'working on a plan in the middle of the week',
    time: 'a few minutes ago',
    iamCount: 130,
  },
  {
    id: '157',
    name: 'Quinn',
    text: 'working on a plan while the house is quiet',
    time: '25m ago',
    iamCount: 5,
  },
  {
    id: '158',
    name: 'Parker',
    text: 'working on a plan in the quiet hour',
    time: '12m ago',
    iamCount: 15,
  },
  {
    id: '159',
    name: 'Reese',
    text: 'scrolling a pile of laundry instead of sleeping',
    time: '5m ago',
    iamCount: 8,
  },
  {
    id: '160',
    name: 'Rowan',
    text: 'sitting at my desk and trying to focus',
    time: '5m ago',
    iamCount: 25,
  },
  {
    id: '161',
    name: 'Emery',
    text: 'lying in bed trying to finish messages',
    time: '5m ago',
    iamCount: 1,
  },
  {
    id: '162',
    name: 'Skyler',
    text: 'watching a documentary and not really paying attention',
    time: '18m ago',
    iamCount: 1,
  },
  {
    id: '163',
    name: 'Drew',
    text: 'trying to write a plan',
    time: 'yesterday',
    iamCount: 18,
  },
  {
    id: '164',
    name: 'Blake',
    text: 'sitting at a quiet corner and trying to focus',
    time: 'a few minutes ago',
    iamCount: 5,
  },
  {
    id: '165',
    name: 'Hayden',
    text: 'working on a budget with a half-finished mug of tea',
    time: 'last night',
    iamCount: 34,
  },
  {
    id: '166',
    name: 'Cameron',
    text: 'scrolling tabs instead of sleeping',
    time: '12m ago',
    iamCount: 10,
  },
  {
    id: '167',
    name: 'Finley',
    text: 'sitting at the corner of the room and trying to focus',
    time: 'yesterday',
    iamCount: 25,
  },
  {
    id: '168',
    name: 'Logan',
    text: 'sitting in the balcony feeling fine',
    time: '25m ago',
    iamCount: 41,
  },
  {
    id: '169',
    name: 'Sidney',
    text: 'watching tv and not really paying attention',
    time: '18m ago',
    iamCount: 1,
  },
  {
    id: '170',
    name: 'Marley',
    text: 'working on a resume while it rains',
    time: 'just now',
    iamCount: 25,
  },
  {
    id: '171',
    name: 'Dakota',
    text: 'watching a show and not really paying attention',
    time: '18m ago',
    iamCount: 5,
  },
  {
    id: '172',
    name: 'Harper',
    text: 'working on a side project when i should be sleeping',
    time: 'just now',
    iamCount: 4,
  },
  {
    id: '173',
    name: 'Sage',
    text: 'avoiding a presentation and feeling tired',
    time: 'a few minutes ago',
    iamCount: 12,
  },
  {
    id: '174',
    name: 'River',
    text: 'working on a grocery list on a saturday',
    time: 'this morning',
    iamCount: 1,
  },
  {
    id: '175',
    name: 'Mason',
    text: 'avoiding a to-do list and feeling tired',
    time: 'yesterday',
    iamCount: 1,
  },
  {
    id: '176',
    name: 'Ari',
    text: 'sitting at the back porch and trying to focus',
    time: '5m ago',
    iamCount: 2,
  },
  {
    id: '177',
    name: 'Jamie',
    text: 'sitting in the car feeling tired',
    time: 'this morning',
    iamCount: 4,
  },
  {
    id: '178',
    name: 'Kendall',
    text: 'sitting at the car and trying to focus',
    time: '18m ago',
    iamCount: 34,
  },
  {
    id: '179',
    name: 'Lane',
    text: 'scrolling photos instead of sleeping',
    time: '25m ago',
    iamCount: 85,
  },
  {
    id: '180',
    name: 'Toby',
    text: 'sitting in the corner of the room feeling distracted',
    time: 'just now',
    iamCount: 60,
  },
  {
    id: '181',
    name: 'Noah',
    text: 'working on an overdue task while everyone is out',
    time: 'last night',
    iamCount: 85,
  },
  {
    id: '182',
    name: 'Mila',
    text: 'avoiding a sketch and feeling tired',
    time: 'earlier today',
    iamCount: 30,
  },
  {
    id: '183',
    name: 'Lena',
    text: 'avoiding a proposal and feeling distracted',
    time: 'yesterday',
    iamCount: 96,
  },
  {
    id: '184',
    name: 'Owen',
    text: 'working on an overdue task late at night',
    time: '25m ago',
    iamCount: 12,
  },
  {
    id: '185',
    name: 'Ivy',
    text: 'working on a report during a break',
    time: '12m ago',
    iamCount: 30,
  },
  {
    id: '186',
    name: 'Eli',
    text: 'working on a cover letter with a half-finished mug of tea',
    time: '5m ago',
    iamCount: 48,
  },
  {
    id: '187',
    name: 'Nora',
    text: 'lying in bed scrolling through notes',
    time: 'earlier today',
    iamCount: 55,
  },
  {
    id: '188',
    name: 'Zoey',
    text: 'working on a presentation with the tv on',
    time: '12m ago',
    iamCount: 0,
  },
  {
    id: '189',
    name: 'Luca',
    text: 'avoiding a calendar and feeling restless',
    time: '5m ago',
    iamCount: 18,
  },
  {
    id: '190',
    name: 'Aria',
    text: 'working on a presentation on a sunday',
    time: 'just now',
    iamCount: 130,
  },
  {
    id: '191',
    name: 'Maya',
    text: 'sitting at the floor and trying to focus',
    time: '12m ago',
    iamCount: 25,
  },
  {
    id: '192',
    name: 'Theo',
    text: 'working on a draft with the window open',
    time: '25m ago',
    iamCount: 10,
  },
  {
    id: '193',
    name: 'June',
    text: 'avoiding a new routine and feeling quiet',
    time: '18m ago',
    iamCount: 18,
  },
  {
    id: '194',
    name: 'Leah',
    text: 'avoiding a long message and feeling half awake',
    time: 'last night',
    iamCount: 41,
  },
  {
    id: '195',
    name: 'Caleb',
    text: 'working on a cover letter while everyone is out',
    time: 'this morning',
    iamCount: 130,
  },
  {
    id: '196',
    name: 'Cora',
    text: 'watching a documentary and not really paying attention',
    time: 'yesterday',
    iamCount: 0,
  },
  {
    id: '197',
    name: 'Jules',
    text: 'sitting at my desk and trying to focus',
    time: '12m ago',
    iamCount: 22,
  },
  {
    id: '198',
    name: 'Miles',
    text: 'scrolling news instead of sleeping',
    time: 'earlier today',
    iamCount: 30,
  },
  {
    id: '199',
    name: 'Eden',
    text: 'lying in bed scrolling messages',
    time: 'a few minutes ago',
    iamCount: 15,
  },
  {
    id: '200',
    name: 'Wren',
    text: 'avoiding a grocery list and feeling calm',
    time: 'last night',
    iamCount: 18,
  },
]

function SearchBar({ value, onChange, onCreate }: SearchBarProps) {
  return (
    <div>
      <input
        id="search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="who else is…"
      />
      {value.trim() ? (
        <div className="composer-actions">
          <button type="button" onClick={onCreate}>
            I be
          </button>
        </div>
      ) : null}
    </div>
  )
}

function Feed({ posts }: FeedProps) {
  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}

function App() {
  const [query, setQuery] = useState('')
  const [viewStyle, setViewStyle] = useState('whoelseis')
  const [posts, setPosts] = useState<Post[]>(initialPosts)

  const handleCreatePost = () => {
    const trimmed = query.trim()
    if (!trimmed) {
      return
    }

    const newPost: Post = {
      id: String(Date.now()),
      name: 'You',
      text: trimmed,
      time: 'just now',
      iamCount: 1,
    }

    setPosts((prevPosts) => [newPost, ...prevPosts])
    setQuery('')
  }

  const filteredPosts = query
    ? posts.filter((post) =>
        post.text.toLowerCase().includes(query.toLowerCase())
      )
    : [...posts].sort((a, b) => b.iamCount - a.iamCount)

  return (
    <div className={`style-${viewStyle}`}>
      <main>
        <header className="site-header">
          <h1>Who Else Is?</h1>
          <div className="search-panel">
          <SearchBar
            value={query}
            onChange={setQuery}
            onCreate={handleCreatePost}
          />
          </div>
        </header>
        <Feed posts={filteredPosts} />
        <div className="view-selector">
          <select
            value={viewStyle}
            onChange={(event) => setViewStyle(event.target.value)}
          >
            <option value="whoelseis">Who Else Is</option>
            <option value="myspace">MySpace</option>
            <option value="facebook">Facebook</option>
            <option value="reddit">Reddit</option>
            <option value="princess">Princess</option>
          </select>
        </div>
      </main>
    </div>
  )
}

export default App
