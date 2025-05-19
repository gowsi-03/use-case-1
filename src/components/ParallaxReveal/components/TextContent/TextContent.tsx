import { Typography } from "antd";
import styles from "./TextContent.module.css";
import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";

const { Title, Paragraph } = Typography;

type Props = {
  title: string;
  subtitle: string | Document;
};

const TextContent = ({ title, subtitle }: Props) => {
  const hasLineBreaks = typeof subtitle === "string" && /<br\s*\/?>/i.test(subtitle);

  return (
    <div className={styles.textContentWrapper}>
      <div className={styles.sectionTitle}>
        <Title level={3}>{title}</Title>
      </div>
      <div className={styles.sectionPara}>
        <Paragraph>
          {typeof subtitle === "string"
            ? hasLineBreaks
              ? subtitle.split(/<br\s*\/?>/i).map((part, idx, arr) => (
                  <React.Fragment key={idx}>
                    {part.trim()}
                    {idx < arr.length - 1 && <br />}
                  </React.Fragment>
                ))
              : subtitle
            : documentToReactComponents(subtitle)}
        </Paragraph>
      </div>
    </div>
  );
};

export default TextContent;
