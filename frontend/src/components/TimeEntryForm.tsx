import { Form, Input, Button } from 'antd';

const TimeEntryForm = () => {
  const [form] = Form.useForm();

  // TODO - replace this with a call to the API
  const onFinish = (values: any) => {
    console.log('Form values:', values);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item label="Task" name="taskId" rules={[{ required: true, message: 'Please enter the task ID' }]}>
        <Input placeholder="Task ID" />
      </Form.Item>

      <Form.Item label="User" name="userId" rules={[{ required: true, message: 'Please enter the user ID' }]}>
        <Input placeholder="User ID" />
      </Form.Item>

      <Form.Item label="Entry Date" name="entryDate" rules={[{ required: true, message: 'Please enter the entry date' }]}>
        <Input placeholder="Entry Date" />
      </Form.Item>

      <Form.Item label="Duration" name="duration" rules={[{ required: true, message: 'Please enter the duration' }]}>
        <Input placeholder="Duration" />
      </Form.Item>

      <Form.Item label="Comment" name="comment">
        <Input.TextArea placeholder="Comment" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TimeEntryForm;
