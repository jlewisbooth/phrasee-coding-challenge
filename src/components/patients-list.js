import React, { useEffect, useState } from 'react';
import { List, Typography } from 'antd';
import { connect } from 'react-redux';

const Patient = ({
    name,
    joined,
    last_visit_date,
    is_completed
}) => {

    return (
        <div className='patient-item-wrapper'>
            <Typography.Text>{`Name: ${name}`}</Typography.Text>
            <Typography.Text>{`Joined: ${new Date(joined).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}`}</Typography.Text>
            <Typography.Text>{`Last Visit: ${new Date(last_visit_date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}`}</Typography.Text>
            <Typography.Text>{`Completed: ${is_completed ? "Yes" : "No"}`}</Typography.Text>
        </div>
    )
}

const PatientsList = ({
    patientsList
}) => {
    const [levels, setLevels] = useState([]);

    const sortPatients = (patients) => {
        let groupedPatients = {};
        for(let patient of patients) {
            if(!patient.is_completed) {
                if(!groupedPatients[patient.type]) {
                    groupedPatients[patient.type] = [];
                }

                groupedPatients[patient.type].push({
                    ...patient,
                    last_visit_date: new Date(patient.last_visit_date)
                });
            }
        }

        let updatedLevels = [];
        for(let [type, elements] of Object.entries(groupedPatients)) {
            let level = {
                title: type.toUpperCase().replace('_', '-'),
                patients: elements.sort((a,b) => a.last_visit_date - b.last_visit_date) 
            };

            updatedLevels.push(level);
        }

        setLevels(updatedLevels);
    }

    useEffect(() => {
        if(Array.isArray(patientsList)) {
            sortPatients(patientsList);
        }
    }, [patientsList]);

    return (
        <div className='patient-list-wrapper'>
            <Typography.Title level={3}>Patients:</Typography.Title>
            {levels.map(level => {
                return (
                    <div key={level.title}>  
                        <div className='patient-list-item-header'>{level.title}</div>
                        <List
                            dataSource={level.patients}
                            renderItem={(item) => (
                                <Patient {...item} />
                            )} />
                    </div>
                )
            })}
        </div>
    )
}

const mapStateToProps = state => {
    return {
      patientsList: state.patientsList,
    }
}

export default connect(mapStateToProps)(PatientsList);