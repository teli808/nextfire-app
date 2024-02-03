import Head from "next/head";

export default function Metatags({
    title = 'Lionheart Dev Discussion Platform',
    description = 'Discuss games like Paper Adventure',
    image = 'https://wallpapers.com/images/high/non-copyrighted-purple-aesthetic-view-6ad1lsfony65z6q5.webp',
  }) {
    return (
      <Head>
        <title>{title}</title>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@lionheart_dev" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
  
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
      </Head>
    );
  }