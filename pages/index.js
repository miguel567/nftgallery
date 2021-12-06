import Head from "next/head"; // Head meta
import client from "@data/index"; // GraphQL client
import Post from "@components/Post"; // Post component
import Layout from "@components/Layout"; // Layout wrapper
import { useState, useEffect } from "react"; // State management
import { getPostByID } from "@data/functions"; // Post retrieval function
import makeBlockie from "ethereum-blockies-base64"; // Ethereum avatar
import { ZORA_MEDIA_BY_OWNER } from "@data/queries"; // Retrieval query
import styles from "@styles/pages/Profile.module.scss"; // Component styles
import axios from "axios";


export default function Home() {
  const address = '0xbf6ccf49cc2874f01916d747a8fe97f14a082be0';
  const NFtContractAddress = '0xaadc2d4261199ce24a4b0a57370c4fcf43bb60aa';
  const [posts, setPosts] = useState([]); // Posts array
  const [loading, setLoading] = useState(true); // Global loading state

  const getIPFSUri = (_uri) =>{
    if(_uri.startsWith('ipfs')){
      _uri = _uri.replace("ipfs://","https://ipfs.io/ipfs/");
    }
    return _uri;

  }
  /**
   * Collect owned media by address on load
   */
  const collectOwnedMedia = async () => {
    // Collect all postIDs by owner
      const allPosts = await client.request(
          ZORA_MEDIA_BY_OWNER(address.toLowerCase(),NFtContractAddress)
    );
    console.log("tokens:", allPosts.owners[0].tokens);
    console.log("all:", allPosts);
    let ownedMedia = [];
    // For all owned posts
    let headers = {
      headers: {

      'Content-Type': 'application/json, text/plain, */*',
      }
    }

    for (let i = 0; i < allPosts.owners[0].tokens.length; i++) {

      const metadataURI = getIPFSUri(allPosts.owners[0].tokens[i].tokenURI);
      try {
        const metadata = await axios.get(metadataURI, headers);
        console.log("Token:",allPosts.owners[0].tokens[i]);
        console.log("Token Metadata:",metadata);
  
        const post = {
          "ownerAddress": allPosts.owners[0].id,
          "contract": allPosts.owners[0].tokens[i].contract,
          "token_ID": allPosts.owners[0].tokens[i].id,
          "tokenURI": allPosts.owners[0].tokens[i].tokenURI,
          "mintTime":  allPosts.owners[0].tokens[i].mintTime,
          "image": getIPFSUri(metadata.data.image), 
          "name": metadata.data.name, 
          "description": metadata.data.description
  
  
        }
        ownedMedia.push(post);
      } catch (error) {
        console.log(error);
        
      }




    }
    console.log("OwnedMedia:", ownedMedia);

    setPosts([...ownedMedia.reverse()]); // Update owned posts (reversed for newest first)
    setLoading(false); // Toggle loading
  };

  // Collect owned media on load
  useEffect(collectOwnedMedia, [address]);

  return (
    <Layout>
      <Head>
        {/* Custom meta for profile */}
        <meta
          property="og:image"
          content={`https://zora.gallery/api/meta/profile?address=${address}`}
        />
        <meta
          property="twitter:image"
          content={`https://zora.gallery/api/meta/profile?address=${address}`}
        />
      </Head>

      <div className={styles.profile}>
        {/* Profile header */}
        <div className={styles.profile__head}>
          {/* Avatar */}
          <img src={makeBlockie(address)} alt="Avatar" />

          {/* Name/Address */}
          <h3>{address.toLowerCase()}</h3>

          {/* Etherscan link */}
          <a
            href={`https://explorer.palm.io/address/${address}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Palm Explorer
          </a>
        </div>
      </div>

      {loading ? (
        // If loading state, show loading
        <div className={styles.profile__media_empty}>
          <span>Loading...</span>
        </div>
      ) : posts.length > 0 ? (
        // Else if, post count > 0
        <div className={styles.profile__media}>
          {posts.map((post, i) => {
            // For each Zora post
            return (
              // Return Post component
              <Post
                key={i}
                ownerAddress={post.ownerAddress}
                creatorAddress={post.contract}
                createdAtTimestamp={post.mintTime}
                contentURI={post.image}
                name={post.name}
                description={post.description}
              />
            );
          })}
        </div>
      ) : (
        // Else, if not loading and post count !> 0, return no owned media
        <div className={styles.profile__media_empty}>
          <span>No owned media.</span>
        </div>
      )}
    </Layout>
  );
}

