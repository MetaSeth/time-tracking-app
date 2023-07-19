import { Button } from 'antd'

const AddButton: React.FC = () => {
    return (
        <div>
            <Button type="primary" href="/create">
                New Time Entry
            </Button>
        </div>
    )
}

export default AddButton
