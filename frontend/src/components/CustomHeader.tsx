import { Layout } from 'antd'
import { Header } from 'antd/es/layout/layout'
import { Link } from 'react-router-dom'

const CustomHeader = () => {
    return (
        <Layout>
            <Header
                style={{
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Link
                    to="/"
                    style={{
                        backgroundColor: '#fff',
                        justifyContent: 'center',
                        display: 'flex',
                    }}
                >
                    <h1>Time Tracking App</h1>
                </Link>
            </Header>
        </Layout>
    )
}

export default CustomHeader
