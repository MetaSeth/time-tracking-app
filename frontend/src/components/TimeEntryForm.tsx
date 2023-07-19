import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Select,
    Space,
} from 'antd'
import { Timestamp } from 'firebase/firestore'
import { useContext, useEffect, useState } from 'react'
import UserContext from '../context/UserContext'
import { firestore } from '../firebase'
import Project from '../interfaces/Project'
import Task from '../interfaces/Task'
import { getProjects } from '../services/ProjectService'
import { getTasks } from '../services/TaskService'
import { addTimeEntry } from '../services/timeEntryService'

const TimeEntryForm = () => {
    const [form] = Form.useForm()
    const userContext = useContext(UserContext)
    const currentUser = userContext?.user || null
    const [tasks, setTasks] = useState<Task[]>([])
    const [projects, setProjects] = useState<Project[]>([])
    const projectValue = Form.useWatch<string>('projectId', form)

    const layout = {
        labelCol: {
            span: 13,
            // offset: 15,
        },
        wrapperCol: {
            span: 25,
            // offset: 15,
        },
    }

    useEffect(() => {
        const fetchData = async () => {
            const fetchedTasks = await getTasks(firestore)
            const fetchedProjects = await getProjects(firestore)
            setTasks(fetchedTasks)
            setProjects(fetchedProjects)
        }
        fetchData()
    }, [firestore, currentUser])

    const onFinish = async (values: any) => {
        const formattedValues = {
            ...values,
            date: Timestamp.fromDate(values.date.toDate()),
            userId: currentUser?.id,
        }
        await addTimeEntry(formattedValues, firestore)
        form.resetFields()
    }

    const onReset = () => {
        form.resetFields()
    }

    const renderTasksofProject = () => {
        const projectTasks = tasks.filter(
            (task) => task.projectId === projectValue
        )
        return projectTasks.map((task) => (
            <Select.Option key={task.id} value={task.id}>
                {task.name}
            </Select.Option>
        ))
    }

    return (
        <Form {...layout} form={form} onFinish={onFinish} layout="vertical">
            <Form.Item
                label="Project"
                name="projectId"
                rules={[
                    { required: true, message: 'Please enter the project ID' },
                ]}
            >
                <Select>
                    {projects.map((project) => (
                        <Select.Option key={project.id} value={project.id}>
                            {project.name}
                            {project.id}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                label="Task"
                name="taskId"
                hidden={!projectValue}
                rules={[
                    { required: true, message: 'Please enter the task ID' },
                ]}
            >
                <Select>{renderTasksofProject()}</Select>
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
                <Space>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    )
}

export default TimeEntryForm
