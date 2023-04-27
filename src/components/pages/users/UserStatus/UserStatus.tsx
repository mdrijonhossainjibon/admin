import { Tag } from "antd";
import { CheckCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { UserState } from "../../../../constants/user";

export default function UserStatus(props: { state: string }) {
  const { state } = props;
  return state === UserState.Active ? (
    <Tag icon={<CheckCircleOutlined />} color="success">
      {state}
    </Tag>
  ) : state === UserState.Banned ? (
    <Tag icon={<ExclamationCircleOutlined />} color="error">
      {state}
    </Tag>
  ) : (
    <Tag icon={<ExclamationCircleOutlined />} color="warning">
      {state}
    </Tag>
  );
}
