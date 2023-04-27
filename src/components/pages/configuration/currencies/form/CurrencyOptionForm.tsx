import React, { SetStateAction, Dispatch, useState } from "react";
import { Col, Form, Input, Button, Popover, Space, Typography, Row } from "antd";
import { CurrencyOption } from "./CurrenciesForm";
import { useTranslation } from "react-i18next";

interface Props {
  fields: CurrencyOption[];
  setFields: Dispatch<SetStateAction<CurrencyOption[]>>;
}

export default function CurrencyOptionForm({ fields, setFields }: Props) {
  const [propertyName, setPropertyName] = useState("");
  const { t: translate } = useTranslation();
  console.log("options", fields);

  const t = (id: string) => translate(`setter.layouts.configurations.currencies.form.properties.${id}`);

  const addProperty = (propertyName: string) => {
    const field: CurrencyOption = { key: propertyName, value: "" };

    setFields([...fields, field]);
  };

  console.log();

  const removeProperty = (index: number) => {
    const _fields = Object.assign([] as CurrencyOption[], fields);

    _fields.splice(index, 1);

    setFields(_fields);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const _fields = fields.map((field) => (field.key === name ? { ...field, value } : field));

    setFields(_fields);
  };

  const addPropertyContent = () => {
    const propertyNameExists = fields.some((field) => field.key.toLowerCase() === propertyName.toLowerCase());

    return (
      <Form>
        <Space>
          <Input placeholder={t("addProperty.placeholder")} onChange={(e) => setPropertyName(e.target.value)} />
          <Button
            htmlType="submit"
            type="primary"
            onClick={() => addProperty(propertyName)}
            disabled={!propertyName || propertyNameExists}
          >
            {t("addProperty.cta")}
          </Button>
        </Space>
      </Form>
    );
  };

  return (
    <Form component={false}>
      <div>
        <Typography.Title level={5}>{t("title")}</Typography.Title>
        <Popover placement="topLeft" content={addPropertyContent} trigger="click" title={t("addProperty.title")}>
          <Button type="link">+ {t("button")} </Button>
        </Popover>
      </div>
      {fields.map(({ key, value }, index) => (
        <Form.Item label={key} name={key} key={key}>
          <Row gutter={10}>
            <Col flex={1}>
              <Input value={value} onChange={handleInputChange} name={key} />
            </Col>
            <Col>
              <Button type="ghost" onClick={() => removeProperty(index)}>
                {t("remove")}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      ))}
    </Form>
  );
}
