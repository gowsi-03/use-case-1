import { Typography } from "antd";
import styles from "./TextContent.module.css";

const { Title, Paragraph } = Typography;

type Props = {
  title: string;
  subtitle: string;
};

const TextContent = ({ title, subtitle }: Props) => (
  <div>
    <div className={styles.sectionTitle}>
      <Title level={3}>{title}</Title>
    </div>
    <div className={styles.sectionPara}>
      <Paragraph>{subtitle}</Paragraph>
    </div>
  </div>
);


export default TextContent