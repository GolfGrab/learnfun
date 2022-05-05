import { Button, Container, Text, Title } from '@mantine/core'
import Image from 'next/image'
import React from 'react'
import { useAuth } from '../../context/Context'

const Dashboard = () => {
  const authData = useAuth()
  const user = authData?.user

  return (
    <Container fluid>
      <Title align="center" mt={20} mb={20}>
        <Text inherit component="span">
          Dashboard
        </Text>
      </Title>
      <Container>
        {user && user.photoURL && (
          <>
            <Text component="div" size="xl" mt={40} mb={20}>
              firebase auth data
            </Text>

            <Image src={user.photoURL} width="100px" height="100px" alt="userPhoto" />
            <Text> displayName : {user.displayName} </Text>
            <Text> email : {user.email} </Text>
            <Text>
              photoURL :{' '}
              {
                <Button
                  component="a"
                  size="xs"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={user.photoURL}
                >
                  photoURL
                </Button>
              }{' '}
            </Text>
            <Text>uid : {user.uid}</Text>
          </>
        )}
      </Container>
    </Container>
  )
}

export default Dashboard
