import {
  Backpack,
  Bird,
  BookA,
  CircleDollarSign,
  Cpu,
  Euro,
  Languages,
  LibraryBig,
  Newspaper,
  Omega,
  Orbit,
  Percent,
  Pi,
  SquareLibrary,
  TreeDeciduous,
} from 'lucide-react';

import {
  bafs,
  bio,
  chem,
  chi,
  chihist,
  econ,
  eng,
  enghist,
  geog,
  ict,
  ls,
  m0,
  m1,
  m2,
  phy,
  ths,
} from '.';

export const metaData = [
  {
    key: 'chi',
    displayName: 'Chinese',
    displayNameTc: '中文',
    icon: <Languages />,
    years: Object.keys(chi.chi),
  },
  {
    key: 'eng',
    displayName: 'English',
    displayNameTc: '英文',
    icon: <BookA />,
    years: Object.keys(eng.eng),
  },
  {
    key: 'm0',
    displayName: 'Maths',
    displayNameTc: '數學',
    icon: <Omega />,
    years: Object.keys(m0.eng),
  },
  {
    key: 'ls',
    displayName: 'Liberal Studies',
    displayNameTc: '通識',
    icon: <Newspaper />,
    years: Object.keys(ls.eng),
  },

  {
    key: 'bio',
    displayName: 'Biology',
    displayNameTc: '生物',
    icon: <Bird />,
    years: Object.keys(bio.eng),
  },
  {
    key: 'chem',
    displayName: 'Chemistry',
    displayNameTc: '化學',
    icon: <Orbit />,
    years: Object.keys(chem.eng),
  },
  {
    key: 'phy',
    displayName: 'Physics',
    displayNameTc: '物理',
    icon: <Omega />,
    years: Object.keys(phy.eng),
  },
  {
    key: 'm1',
    displayName: 'Maths (M1)',
    displayNameTc: '數學 (M1)',
    icon: <Percent />,
    years: Object.keys(m1.eng),
  },
  {
    key: 'm2',
    displayName: 'Maths (M2)',
    displayNameTc: '數學 (M2)',
    icon: <Pi />,
    years: Object.keys(m2.eng),
  },

  {
    key: 'econ',
    displayName: 'Economics',
    displayNameTc: '經濟',
    icon: <Euro />,
    years: Object.keys(econ.eng),
  },
  {
    key: 'bafs',
    displayName: 'Business, Accounting and Financial Studies',
    displayNameTc: '企業、會計與財務概論',
    icon: <CircleDollarSign />,
    years: Object.keys(bafs.eng),
  },

  {
    key: 'geog',
    displayName: 'Geography',
    displayNameTc: '地理',
    icon: <TreeDeciduous />,
    years: Object.keys(geog.eng),
  },

  {
    key: 'chihist',
    displayName: 'Chinese History',
    displayNameTc: '中國歷史',
    icon: <LibraryBig />,
    years: Object.keys(chihist.chi),
  },
  {
    key: 'enghist',
    displayName: 'History',
    displayNameTc: '世界歷史',
    icon: <SquareLibrary />,
    years: Object.keys(enghist.eng),
  },

  {
    key: 'ict',
    displayName: 'ICT',
    displayNameTc: '資訊科技',
    icon: <Cpu />,
    years: Object.keys(ict.eng),
  },
  {
    key: 'ths',
    displayName: 'Tourism and Hospitality Studies',
    displayNameTc: '旅遊與款待',
    icon: <Backpack />,
    years: Object.keys(ths.chi),
  },
];

export type SubjectMetaType = (typeof metaData)[0];
