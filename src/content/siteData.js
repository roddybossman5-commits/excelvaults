/**
 * Structured content extracted from excelvaults.com (WordPress REST API,
 * theme: transcargo). This is the FIXED-mode source — the same copy the live
 * site carries, but as data instead of unrendered WPBakery shortcodes.
 *
 * The verbatim shortcode strings live in ./rawCopy.js for RAW mode.
 */

export const SITE = {
  name: 'Excel Vaults',
  copyright: 'Excel Vault © 2022',
  email: 'info@excelvaults.com',
  secondaryEmail: 'consult@excelvaults.com',
  accountPortal: '/tracking',
};

export const OFFICES = [
  {
    label: 'London Office',
    phone: '+44 7451281142',
    email: 'info@excelvaults.com',
    hours: 'Mon — Sat: 9AM — 6PM',
    address: '46 Berkeley square, Mayfair, London W1J 5AU, United Kingdom',
  },
  {
    label: 'Dubai United Arab Emirates',
    phone: '+44 745 128 3327',
    email: 'info@excelvaults.com',
    hours: 'Mon — Fri: 9AM — 6PM',
    address: 'Aghadeer Building, Kuwait road Mankhool 17-a Bur Dubai',
  },
  {
    label: 'Germany, Berlin',
    phone: '+447520638070',
    email: 'info@excelvaults.com',
    hours: '',
    address: 'Dienststelle Jena Goethestraße 107743 Jena',
  },
];

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about-us' },
  { label: 'Services', to: '/services-grid' },
  { label: 'Tracking', to: '/tracking' },
  { label: 'Contacts', to: '/contacts' },
];

export const HOME = {
  heroHeading: 'A TRUSTED COMPANY FOR YOUR VALUABLES',
  heroCopy: [
    'Excel Vaults and Courier Company and its subsidiaries offer private and business safe deposit, private business Deposit and private wealth management, including investment, trust and brokerage services.',
    'Excel Vaults specializes in delivering exceptional, relationship-based service, with a solid Contingent staffing agencies in the United kingdom. and commitment to responsiveness and action',
  ],
  counters: [
    { value: 2000, title: 'Safe deposits' },
    { value: 200, title: 'Delivery points' },
    { value: 3000, title: 'Clients' },
    { value: 10, title: 'Years of experience' },
  ],
  servicesHeading: 'Special Services',
  servicesIntro:
    'Globally known for our ability to safely keep your precious minerals to your satisfaction. We deliver to you as and you when you need as well. Tracking made easy',
  guaranteeHeading: 'SECURED DELIVERY 100% GUARANTEED',
  guaranteeCopy:
    'Because of our specialty as far as safe Vault Keeping and delivering systems are concerned, you can rest assured of a proper tracking system from this website. We deliver as a solid Contingent staffing agencies in the UK.',
  faq: [
    {
      title: 'Private Safe Deposit Box',
      body: 'Gold and silver storage has become a popular topic of conversation given the current economic climate. People are turning to the fine metals as a way to protect their hard-earned money from losing value. Once acquired, you might be asking – what is the best place to store gold and silver? And don’t forget, we are also noted to be the best Contingent staffing agencies in the UK.',
    },
    {
      title: 'Bank Safe Deposit Box',
      body: 'A bank is limited in the number of boxes they have available to rent as well as the size of those boxes. You must also wait your turn in a bank lobby to access your box and register for that box using all of your private information. If that bank closes for any reason, your options to access your box are very limited.',
    },
    {
      title: 'Private Vault Storage',
      body: 'Private vaults carry the least amount of risk and are the most secure method of gold and silver storage. At Excel Vaults, you will have access to your box even if there is a banking crisis. Your valuables are in a safe location and cannot be accessed by anyone except the box holder.',
    },
    {
      title: 'Buried in the Backyard',
      body: 'You may think “hide in plain sight” is your best option, but when you bury gold and silver in your backyard all someone has to do is scale your fence, use a metal detector and dig it all up. In addition, silver is prone to corrosion and needs to be stored in an atmospherically controlled environment, such as Excel Vaults.',
    },
  ],
  specialHeading: 'What makes us special?',
  specialCopy:
    'With operational excellence and years of experience in security innovation and courier services, we serve you better.',
  // `icon` values are transcargo icon-font names — see components/icons/StmIcon.js.
  // They match the `drawing_icon` argument the live shortcodes pass.
  specialItems: [
    { title: 'Secured Storage', icon: 'stm-packaging-and-storage' },
    { title: 'Secured Warehousing', icon: 'stm-warehousing-service' },
    { title: 'Prompt courier Services', icon: 'stm-ground-transport' },
    { title: 'Detailed Tracking', icon: 'stm-projects-done' },
  ],
  quoteHeading: 'Request a Free Quote',
};

export const ABOUT = {
  heading: 'About Us',
  intro: [
    'We are experts in Safe Keeping and Courier Services, security Safe Box, Family Treasure Protection and exceptional Package Delivery. Our guiding company aim is simple: To give our customers peace of mind in relation to the Security and Courier services of their Valuables. You see, we really do care.',
    'Our company is a young, vibrant company. The staff are all highly qualified and dedicated to providing the best possible service to Contingent staffing agencies in across Europe and the United Arab Emirates. They all have considerable experience in the Security and Courier business',
    'From our control center, information is quickly relayed to our Staffs to facilitate a fast and efficient service.',
  ],
  advantagesHeading: 'OUR ADVANTAGES',
  advantages: [
    'We are experts in Safe Keeping and Courier Services, security Safe Box, Family Treasure Protection and and exceptional Package Delivery.',
    'Our guiding company aim is simple: To give our customers peace of mind in relation to the Security and Courier services of their Valuables. You see, we really do care.',
    'Our company is a young, vibrant company. The staff are all highly qualified and dedicated to providing the best possible service to Contingent staffing agencies in the UK and our clients. They all have considerable experience in the Security and Courier business',
    'From our control center, information is quickly relayed to our Staffs to facilitate a fast and efficient service.',
  ],
  ctaHeading: 'Send us a message should you have any questions.',
  ctaButton: 'Contact Now',
  columns: [
    {
      heading: 'RESEARCH PRODUCTS & SERVICES.',
      body: 'We can accommodate everything from an heirloom ring to an original painting or work of art. Our boxes range in size from 3 in x 5 in x 24 in to 31 in x 15 in x 24 in. We also have cabinets and closets that can be rented should you need additional space. If you are in a small box and need to upgrade to a larger box, you can switch. As long as the larger size is available, it is a simple matter to switch your contents from one unit to another unit and pay the difference in rent.',
    },
    {
      heading: 'COMPLETE ANONYMITY',
      body: 'Excel Vaults offers several benefits over a traditional bank safe deposit box. However, the largest benefit remains the anonymity we offer. We do not require identification or verification of your identity when you rent a box from us. You can pay with cash or check and you may open the box in any name at all. Access to your box will be controlled by possession of the key and a signature match with the card you complete when renting your box',
    },
  ],
};

export const SERVICES = [
  {
    title: 'Safe & Secure',
    icon: 'stm-security',
    text: 'You benefit from our experience in delivering effective solutions to the complex global supply chains of some of the world’s biggest corporations.',
  },
  {
    title: 'Fast Delivery',
    icon: 'stm-fast-delivery',
    text: 'You benefit from every innovation, whether it involves a simple extension to our Air and Ocean Freight products, whether it means a development in warehousing.',
  },
  {
    title: '24/7 Support',
    icon: 'stm-support',
    text: 'All of which explains why you’ll find the team of outstanding support at Excel Vaults ready to apply their passion for solutions in support of your business.',
  },
];

export const CONTACTS = {
  locationsHeading: 'Locations',
  getInTouchHeading: 'Get in Touch',
  getInTouchCopy:
    'Feel free to contact us if you have any questions. there is always someone ready to talk to you.',
  telHeading: 'Tell',
  emailHeading: 'Email',
};

export const FREIGHT_TYPES = [
  'Road Transportation',
  'Air Transportation',
  'Sea Transportation',
  'Warehousing',
];

export const INCOTERMS = [
  'EXW', 'FCA', 'CPT', 'CIP', 'DAT', 'DAP', 'DDP', 'FAS', 'FOB', 'CFR', 'CIF',
];
