import dayjs from "dayjs"; // Dayjs date parsing
import Link from "next/link"; // Dynamic routing
import makeBlockie from "ethereum-blockies-base64"; // Ethereum avatar
import relativeTime from "dayjs/plugin/relativeTime"; // Dayjs extension
import styles from "@styles/components/Post.module.scss"; // Component styles

// Extend Dayjs with relative time parsing
dayjs.extend(relativeTime);

export default function Post({
  creatorAddress,
  ownerAddress,
  createdAtTimestamp,
  mimeType,
  contentURI,
  name,
  ...props
}) {
  return (
    <div className={styles.showcase__card} {...props}>
      {/* Showcase card header */}

      {/* Showcase card content */}
      <div>
          <img src={contentURI}  width="350" alt={name} />
      </div>

      {/* Showcase card footer */}
      
    </div>
  );
}
