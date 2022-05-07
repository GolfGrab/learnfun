import { Box, Button, Checkbox, Container, Group, Text, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { collection, doc, setDoc } from 'firebase/firestore'
import Image from 'next/image'
// import React, { useState } from 'react'
import { firestore } from '../../config/firebase'
import { useDataCTX } from '../../context/Context'

const Dashboard = () => {
  const data = useDataCTX()
  const user = data?.user
  const dbUser = data?.dbUser
  // const [dpn, setDpn] = useState(dbUser?.displayName || '')

  const form = useForm({
    initialValues: {
      displayName: '',
      termsOfService: false,
    },

    validate: {
      displayName: (value) =>
        value && value.length < 20
          ? null
          : 'Invalid Display Name \n\n displayName length must be less than 20 characters',
    },
  })

  const handleSubmit = async (values: { displayName: any }) => {
    const { displayName } = values
    await setDoc(doc(collection(firestore, 'users'), dbUser.uid), {
      displayName,
      email: dbUser.email,
      photoURL: dbUser.photoURL,
      uid: dbUser.uid,
    })

    dbUser.displayName = displayName
    // setDpn(displayName)
    form.reset()
  }

  return (
    <Container fluid>
      <Title align="center" mt={20} mb={20}>
        <Text inherit component="span">
          Dashboard
        </Text>
      </Title>
      <Container>
        {/* {user && user.photoURL && (
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
        )} */}
        {dbUser && dbUser.photoURL && (
          <>
            <Box sx={{ maxWidth: 300 }} mx="auto" pb={20}>
              <Image src={dbUser.photoURL} width="100px" height="100px" alt="dbUserPhoto" />
              <Text> displayName : {dbUser.displayName} </Text>
              {dbUser.email && <Text> email : {dbUser.email} </Text>}
              <Text>
                photoURL :{' '}
                {
                  <Button
                    component="a"
                    size="xs"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={dbUser.photoURL}
                  >
                    photoURL
                  </Button>
                }{' '}
              </Text>
              <Text>uid : {dbUser.uid}</Text>
            </Box>
          </>
        )}
        {dbUser && dbUser.photoURL && (
          <>
            <Box sx={{ maxWidth: 300 }} mx="auto" pb={20}>
              <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                <TextInput
                  required
                  label="displayName"
                  placeholder={dbUser.displayName}
                  {...form.getInputProps('displayName')}
                />

                <Checkbox
                  mt="md"
                  label="I agree to sell my privacy"
                  {...form.getInputProps('termsOfService', { type: 'checkbox' })}
                />

                <Group position="right" mt="md">
                  <Button type="submit" color="red">
                    Change Display Name
                  </Button>
                </Group>
              </form>
            </Box>
          </>
        )}
        {dbUser && dbUser.photoURL && (
          <>
            <Box sx={{ maxWidth: 300 }} mx="auto">
              <Group position="center" mt="md">
                <Button
                  color="red"
                  onClick={async () => {
                    dbUser.displayName = user?.displayName
                    setDoc(doc(collection(firestore, 'users'), dbUser.uid), {
                      displayName: user?.displayName,
                      email: user?.email,
                      photoURL: user?.photoURL,
                      uid: user?.uid,
                    })
                  }}
                >
                  Reset Data To Default
                </Button>
                <Button
                  color="red"
                  onClick={
                    // reload page
                    () => {
                      window.location.reload()
                    }
                  }
                >
                  reload
                </Button>
              </Group>
            </Box>
          </>
        )}
      </Container>
    </Container>
  )
}

export default Dashboard
