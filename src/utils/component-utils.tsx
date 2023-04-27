import React from "react";
import { Col, Row } from "antd";

export const renderRows = (rows: React.ReactNode[][]) =>
  rows.map((row, i) => (
    <Row gutter={12} key={i}>
      {row.map(
        (item, i) =>
          item && (
            <Col span={24 / row.filter((r) => !!r).length} key={i}>
              {item}
            </Col>
          )
      )}
    </Row>
  ));
