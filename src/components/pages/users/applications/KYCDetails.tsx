import { Row, Col, Image, Collapse, Descriptions } from "antd";
import countryISO from "i18n-iso-countries";
import { useTranslation } from "react-i18next";

interface Props {
  record: any;
}

export default function KYCDetails({ record }: Props) {
  const { i18n, t: translate } = useTranslation();
  const lang = i18n.language.split("-")[0];

  const t = (id: string) => translate(`setter.layouts.users.applications.${id}`);
  console.log("KYC", record);
  const data = () => {
    return (
      <Collapse accordion defaultActiveKey={["0"]}>
        {record.documents.map((el: any, ind: number) => (
          <Collapse.Panel
            header={`${el.doc_type} #${el.doc_number} ${t("expired")} ${el.doc_expire}`}
            key={String(ind)}
          >
            <Image width="100%" alt="doc" src={el.upload.url} />
          </Collapse.Panel>
        ))}
      </Collapse>
    );
  };
  const metadata = record.profile.metadata ? JSON.parse(record.profile.metadata) : {};
  const nationality = record.profile.metadata && metadata.nationality ? metadata.nationality : "";
  if (nationality) {
    delete metadata.nationality;
  }
  console.log(metadata, nationality, record.profile.metadata && metadata.nationality);
  const renderMetadata = () => {
    return Object.keys(metadata).map((el) => {
      return <Descriptions.Item label={t(el)}>{metadata[el]}</Descriptions.Item>;
    });
  };
  const address = `${record.profile.address} ${record.profile.city} ${
    record.profile.postcode
  } ${countryISO.getName(record.profile.country, lang, { select: "official" })}`;
  return (
    <Row>
      <Col span={16}>
        <Descriptions bordered size="small" column={2}>
          <Descriptions.Item label={t("name")}>
            {[record.profile.first_name, record.profile.last_name].join(" ")}
          </Descriptions.Item>
          <Descriptions.Item label={t("birthDate")}>{record.profile.dob}</Descriptions.Item>
          <Descriptions.Item label={t("nationality")}>{nationality}</Descriptions.Item>
          <Descriptions.Item label={t("address")}>{address}</Descriptions.Item>
          {record.profile.metadata ? renderMetadata() : ""}
        </Descriptions>
      </Col>
      <Col span={8}>{data()}</Col>
    </Row>
  );
}
