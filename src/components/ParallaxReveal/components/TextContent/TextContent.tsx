import { Typography } from "antd";
import styles from "./TextContent.module.css";
import React from "react";

const { Title, Paragraph } = Typography;

type Props = {
  title: string;
  subtitle: string;
};

const TextContent = ({ title, subtitle }: Props) => {
  const hasLineBreaks = /<br\s*\/?>/i.test(subtitle);

  return (
    <div className={styles.textContentWrapper}>
      <div className={styles.sectionTitle}>
        <Title level={3}>{title}</Title>
      </div>
      <div className={styles.sectionPara}>
        <Paragraph>
          {hasLineBreaks
            ? subtitle.split(/<br\s*\/?>/i).map((part, idx, arr) => (
                <React.Fragment key={idx}>
                  {part.trim()}
                  {idx < arr.length - 1 && <br />}
                </React.Fragment>
              ))
            : subtitle}
        </Paragraph>
      </div>
    </div>
  );
};

export default TextContent;
