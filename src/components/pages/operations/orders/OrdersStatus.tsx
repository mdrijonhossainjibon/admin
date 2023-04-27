import { Tag } from "antd";
import { CheckCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { OrderState } from "../../../../constants/orders";

export default function OrderStatus(props: { state: string }) {
  const { state } = props;
  return state === OrderState.Done ? (
    <Tag icon={<CheckCircleOutlined />} color="success">
      {state}
    </Tag>
  ) : (
    <Tag icon={<ExclamationCircleOutlined />} color="warning">
      {state}
    </Tag>
  );
}
