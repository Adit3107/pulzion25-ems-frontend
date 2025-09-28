export type Sponsor = {
  title: string;
  description: string;
  slug: string;
  logo?: string;
  website?: string;
  variant?: 'default' | 'featured';
};

export const SPONSORS: Sponsor[] = [
  {
    title: 'Tech Innovators Corp',
    description:
      'Leading technology solutions provider supporting innovation in the digital space with cutting-edge products and services.',
    slug: 'tech-innovators-corp',
    website: 'https://techinnovators.com',
    variant: 'featured',
  },
  {
    title: 'Future Systems Ltd',
    description:
      'Advanced software development company specializing in AI and machine learning solutions for modern businesses.',
    slug: 'future-systems-ltd',
    website: 'https://futuresystems.com',
  },
  {
    title: 'Digital Pioneers',
    description:
      'Creative digital agency focused on transforming ideas into powerful digital experiences and brand solutions.',
    slug: 'digital-pioneers',
    website: 'https://digitalpioneers.com',
  },
  {
    title: 'Cloud Dynamics',
    description:
      'Enterprise cloud infrastructure provider delivering scalable and secure solutions for global organizations.',
    slug: 'cloud-dynamics',
    website: 'https://clouddynamics.com',
  },
  {
    title: 'Innovation Labs',
    description:
      'Research and development hub driving technological advancement through collaborative projects and breakthrough innovations.',
    slug: 'innovation-labs',
    website: 'https://innovationlabs.com',
  },
];