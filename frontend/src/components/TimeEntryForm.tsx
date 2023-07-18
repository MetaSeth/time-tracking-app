import { Form, Input, Button, DatePicker, InputNumber } from 'antd'
import { addTimeEntry } from '../services/TimeEntryService'
import { firestore } from '../firebase'
import { Timestamp } from 'firebase/firestore'

// TODO: add Project , task and user selectors
const TimeEntryForm = () => {
    const [form] = Form.useForm()

    const onFinish = async (values: any) => {
        console.log('Received values of form: ', values)

        const formattedValues = {
            ...values,
            date: Timestamp.fromDate(values.date.toDate()),
        }
        console.log('formattedValues:', formattedValues)

        await addTimeEntry(formattedValues, firestore)
        form.resetFields()
    }

    return (
        <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item
                label="Project ID"
                name="projectId"
                rules={[
                    { required: true, message: 'Please enter the project ID' },
                ]}
            >
                <Input placeholder="Project ID" />
            </Form.Item>
            <Form.Item
                label="Task ID"
                name="taskId"
                rules={[
                    { required: true, message: 'Please enter the task ID' },
                ]}
            >
                <Input placeholder="Task ID" />
            </Form.Item>

            <Form.Item
                label="User ID"
                name="userId"
                rules={[
                    { required: true, message: 'Please enter the user ID' },
                ]}
            >
                <Input placeholder="User ID" />
            </Form.Item>

            <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: 'Please enter the date' }]}
            >
                <DatePicker placeholder="Date" />
            </Form.Item>

            <Form.Item
                label="Duration"
                name="duration"
                rules={[
                    { required: true, message: 'Please enter the duration' },
                ]}
            >
                <InputNumber placeholder="Duration" />
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
    )
}

export default TimeEntryForm
