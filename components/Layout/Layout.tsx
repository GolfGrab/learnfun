import { useState } from 'react'
import { AppShell, Header, Text, MediaQuery, Burger, useMantineTheme, Title } from '@mantine/core'
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle'

const Layout: React.FC = ({ children }) => {
  const [opened, setOpened] = useState(false)
  const theme = useMantineTheme()
  return (
    <AppShell
      padding="md"
      header={
        <Header height={70} p="md">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                justifyContent: 'center',
              }}
            >
              <Title align="center">
                <MediaQuery largerThan="xs" styles={{ display: 'none' }}>
                  <Text inherit variant="gradient" component="h1">
                    Learn Fun
                  </Text>
                </MediaQuery>
                <MediaQuery smallerThan="xs" styles={{ display: 'none' }}>
                  <Text inherit variant="gradient" component="h1">
                    Learn Fun Run Together
                  </Text>
                </MediaQuery>
              </Title>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                justifyContent: 'space-between',
              }}
            >
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>
              <ColorSchemeToggle />
            </div>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  )
}

export default Layout
