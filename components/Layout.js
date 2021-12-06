import Head from "next/head"; // HTML Head
import Header from "@components/Header"; // Header component
import styles from "@styles/pages/Layout.module.scss"; // Component styles

export default function Layout({ children }, isProfile) {
  return (
    <div>
      {/* Meta */}
      <Meta isProfile={isProfile} />

      {/* Header */}
      <Header />

      {/* Content container */}
      <div className={styles.container}>{children}</div>
    </div>
  );
}

// Meta
function Meta({ isProfile }) {
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>Palm Network Community NFT Gallery minisite</title>
      <meta name="title" content="Palm Network Community NFT Gallery minisite" />
      <meta
        name="description"
        content="Connect your wallet address and check which Palm Network Community NFT do you hold."
      />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://palm.io" />
      <meta property="og:title" content="Palm Network Community NFT Gallery minisite" />
      <meta
        property="og:description"
        content="Connect your wallet address and check which Palm Network Community NFT do you hold."
      />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://palm.io" />
      <meta property="twitter:title" content="Palm Network Community NFT Gallery minisite" />
      <meta
        property="twitter:description"
        content="Connect your wallet address and check which Palm Network Community NFT do you hold."
      />

      {!isProfile ? (
        // If not profile page, display default meta
        <>
          <meta property="og:image" content="https://zora.gallery/meta.png" />
          <meta
            property="twitter:image"
            content="https://zora.gallery/meta.png"
          />
        </>
      ) : null}
    </Head>
  );
}
