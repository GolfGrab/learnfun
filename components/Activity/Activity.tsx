import {
  Box,
  Button,
  Container,
  Group,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { addDoc, collection } from 'firebase/firestore'
import { SetStateAction, useEffect, useState } from 'react'
import { firestore } from '../../config/firebase'
// import React, { useState } from 'react'
import { useDataCTX } from '../../context/Context'

const Activity = () => {
  const data = useDataCTX()
  const [activities, setActivities] = useState([])
  const getActivities = data?.getActivities
  const dbUser = data?.dbUser
  const [nSubmit, setNSubmit] = useState(0)

  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      photoURL: '',
    },

    validate: {
      title: (value) =>
        value && value.length < 20
          ? null
          : 'Invalid Display Name \n\n displayName length must be less than 20 characters',
    },
  })

  const handleSubmit = async (values: { title: string; description: string; photoURL: string }) => {
    const { title, description, photoURL } = values
    // add activity to firestore
    await addDoc(collection(firestore, 'activities'), {
      title,
      description,
      photoURL,
      ownerID: dbUser.uid,
      date: new Date(),
    })
    setNSubmit((nS) => nS + 1)
    form.reset()
  }

  useEffect(() => {
    getActivities().then((res: SetStateAction<any>) => {
      res[0].sort((a: { date: number }, b: { date: number }) => b.date - a.date)
      setActivities(res[0])
      // console.log(res[0])
    })
  }, [nSubmit])

  return (
    <Container fluid>
      <Title align="center" mt={20} mb={20}>
        <Text inherit component="span">
          Activity
        </Text>
      </Title>
      <Container>
        {dbUser && dbUser.photoURL && (
          <>
            <Box sx={{ maxWidth: 300 }} mx="auto" pb={20}>
              <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                <TextInput
                  required
                  label="title"
                  placeholder="title"
                  {...form.getInputProps('title')}
                />
                <Textarea
                  required
                  label="description"
                  placeholder="description"
                  {...form.getInputProps('description')}
                />
                <TextInput
                  required
                  label="photoURL"
                  placeholder="photoURL"
                  {...form.getInputProps('photoURL')}
                />

                <Group position="right" mt="md">
                  <Button type="submit" color="red">
                    Submit new activity
                  </Button>
                </Group>
              </form>
            </Box>
          </>
        )}
        {activities && (
          <Stack>
            {activities.map(
              (activity: {
                id: string
                description: string
                date: Date
                title: string
                ownerID: string
                photoURL: string
              }) =>
                activity && (
                  <Box key={activity.id}>
                    {/* <Text>{activity.date}</Text> */}
                    <Text mb={10}>TITLE : {activity.title}</Text>
                    <Text mb={10}>DESCRIPTION : {activity.description}</Text>
                    <Text mb={10}>OWNER_ID : {activity.ownerID}</Text>
                    <Text mb={10}>PHOTO_URL : {activity.photoURL}</Text>
                  </Box>
                )
            )}
          </Stack>
        )}
      </Container>
    </Container>
  )
}

export default Activity
