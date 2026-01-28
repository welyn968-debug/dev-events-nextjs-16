// lib/constants.ts
export interface EventItem {
    image: string;
    title: string;
    slug: string;
    location: string;
    date: string;
    time: string;
}

export const events: EventItem[] = [
    {
        image: '/images/event1.png',
        title: 'React Summit 2026',
        slug: 'react-summit-2026',
        location: 'Amsterdam, Netherlands',
        date: 'May 14–15, 2026',
        time: '09:00 - 18:00 (CEST)'
    },
    {
        image: '/images/event2.png',
        title: 'JSConf EU 2026',
        slug: 'jsconf-eu-2026',
        location: 'Berlin, Germany',
        date: 'June 2–4, 2026',
        time: '09:30 - 17:30 (CEST)'
    },
    {
        image: '/images/event3.png',
        title: 'Google I/O 2026',
        slug: 'google-io-2026',
        location: 'Mountain View, CA & Online',
        date: 'May 19–20, 2026',
        time: '10:00 - 16:00 (PDT)'
    },
    {
        image: '/images/event4.png',
        title: 'ETHGlobal Barcelona 2026',
        slug: 'ethglobal-barcelona-2026',
        location: 'Barcelona, Spain',
        date: 'March 21–23, 2026',
        time: '11:00 - 20:00 (CET)'
    },
    {
        image: '/images/event5.png',
        title: 'DevOpsDays London 2026',
        slug: 'devopsdays-london-2026',
        location: 'London, UK',
        date: 'April 8–9, 2026',
        time: '09:00 - 17:00 (BST)'
    },
    {
        image: '/images/event3.png',
        title: 'Next.js Conf 2026',
        slug: 'nextjs-conf-2026',
        location: 'Online',
        date: 'November 3, 2026',
        time: '12:00 - 18:00 (UTC)'
    },
    {
        image: '/images/event1.png',
        title: 'HackMIT Fall 2026',
        slug: 'hackmit-fall-2026',
        location: 'Cambridge, MA, USA',
        date: 'November 14–16, 2026',
        time: '18:00 - 10:00 (local)'
    },
    {
        image: '/images/event4.png',
        title: 'GitHub Universe 2026',
        slug: 'github-universe-2026',
        location: 'San Francisco, CA, USA',
        date: 'October 27–29, 2026',
        time: '09:30 - 17:30 (PDT)'
    }
];
