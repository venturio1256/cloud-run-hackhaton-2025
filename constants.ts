
import { SportEvent } from './types';

export const MOCK_EVENTS: SportEvent[] = [
  {
    id: 1,
    sport: 'NBA',
    teams: [
      { name: 'Lakers', logoUrl: 'https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg' },
      { name: 'Warriors', logoUrl: 'https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg' }
    ],
    time: '2nd QTR - 04:32',
    status: 'LIVE',
    channel: 'ESPN'
  },
  {
    id: 2,
    sport: 'Soccer',
    teams: [
      { name: 'Real Madrid', logoUrl: 'https://ssl.gstatic.com/onebox/media/sports/logos/Th4fAVAZeCJWRcKoLW7koA_96x96.png' },
      { name: 'Barcelona', logoUrl: 'https://ssl.gstatic.com/onebox/media/sports/logos/paYnEE8hcrP96neHRNofhQ_96x96.png' }
    ],
    time: 'Today, 8:00 PM',
    status: 'UPCOMING',
    channel: 'beIN Sports'
  },
  {
    id: 3,
    sport: 'NFL',
    teams: [
      { name: 'Chiefs', logoUrl: 'https://ssl.gstatic.com/onebox/media/sports/logos/kSOU3nL5cMChPjNE8tDclA_96x96.png' },
      { name: '49ers', logoUrl: 'https://ssl.gstatic.com/onebox/media/sports/logos/BEukUSfsH_9F34LeE1T0gA_96x96.png' }
    ],
    time: 'Final',
    status: 'FINAL',
    channel: 'FOX'
  },
   {
    id: 4,
    sport: 'NBA',
    teams: [
      { name: 'Celtics', logoUrl: 'https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg' },
      { name: 'Heat', logoUrl: 'https://cdn.nba.com/logos/nba/1610612748/primary/L/logo.svg' }
    ],
    time: 'Today, 7:30 PM',
    status: 'UPCOMING',
    channel: 'TNT'
  },
  {
    id: 5,
    sport: 'Soccer',
    teams: [
      { name: 'Man City', logoUrl: 'https://ssl.gstatic.com/onebox/media/sports/logos/z44l-a0W1v5FmgPnemV6Xw_96x96.png' },
      { name: 'Liverpool', logoUrl: 'https://ssl.gstatic.com/onebox/media/sports/logos/0iZm6AIyKmo-pJ2hTlyubw_96x96.png' }
    ],
    time: 'Halftime',
    status: 'LIVE',
    channel: 'Peacock'
  },
   {
    id: 6,
    sport: 'NFL',
    teams: [
      { name: 'Eagles', logoUrl: 'https://ssl.gstatic.com/onebox/media/sports/logos/s4ab0JjXpDOespDSf9Zvxw_96x96.png' },
      { name: 'Cowboys', logoUrl: 'https://ssl.gstatic.com/onebox/media/sports/logos/1oDKp4VFE8t2T2f3iH_27g_96x96.png' }
    ],
    time: 'Sunday, 1:00 PM',
    status: 'UPCOMING',
    channel: 'CBS'
  },
];
