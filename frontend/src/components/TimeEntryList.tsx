import React, { useEffect, useState } from 'react';
import { List } from 'antd';
import { getTimeEntries } from '../services/timeEntryService';

const TimeEntryList: React.FC = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await getTimeEntries();
      setEntries(response.entries);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <List
      dataSource={entries}
      renderItem={(item: any) => (
        <List.Item>
          <List.Item.Meta title={`Task ID: ${item.taskId}`} description={`Entry Date: ${item.entryDate}`} />
          <div>
            Duration: {item.duration} - Comment: {item.comment}
          </div>
        </List.Item>
      )}
    />
  );
};

export default TimeEntryList;
