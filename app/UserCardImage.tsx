"use client";
import { Grid, SimpleGrid, CardSection } from "@mantine/core";
import { Card, Avatar, Text, Group, Button } from "@mantine/core";
import { IconPhoneCall, IconAt, IconWorld } from "@tabler/icons-react";
import classes from "./UserCardImage.module.css";
import FetchApi from "./FetchApi";
import { useState, useEffect } from "react";
import Followdiv from "./FollowButton";
import ProfileIcon from "./ProfileIcon";
import { TrashIcon,  PersonIcon } from '@modulz/radix-icons';


const UserCardImage = ({ ...props }) => {
  const [myName, setName] = useState("");
  const follow = Followdiv({ props });
  const user = FetchApi();

  const changeStar = () => {
    let val = myName;
    val === "" ? setName("★") : setName("");
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handleDelete = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log(`Item with ID ${id} deleted successfully`);
            setData(data.filter(user => user.id !== id));
      })
      .catch((error) => {
        console.error("There was a problem with the delete request:", error);
      });
  };

  return (
    <Card radius="md">
      <CardSection>
        <Grid gutter="lg">
          <SimpleGrid
            cols={{ base: 1, sm: 4 }}
            spacing="md"
            style={{
              paddingTop: "30px",
              padding: "20px",
              margin: "20px",

              width: "100%",
            }}
          >
            {user.map((data, index) => (
              <Card
                withBorder
                py="xs"
                key={data.id}
                radius="md"
                style={{
                  padding: "20px 20px 20px",
                }}
              >
                <div
                  style={{
                    padding: "20px 20px",
                    marginTop: "20px",
                  }}
                >
                  <Avatar
                    alt={data?.name}
                    size={100}
                    radius={100}
                    mx="auto"
                    mt={-30}
                    style={{ background: "orchid" }}
                    color="white"
                    className={classes.avatar}
                  >
                    <ProfileIcon fullName={data.name} />
                  </Avatar>
                  <Text ta="center" fz="lg" fw={500} mt="sm">
                    {data.name} {myName}
                  </Text>

                  <Group wrap="nowrap" gap={10} mt={5}>
                    <IconPhoneCall stroke={1.5} size="1rem" />
                    <Text fz="xs" c="dimmed">
                      {data.email}
                    </Text>
                  </Group>
                  <Group wrap="nowrap" gap={10} mt={5}>
                    <IconWorld stroke={1.5} size="1rem" />
                    <Text fz="xs" c="dimmed">
                      {data.phone}
                    </Text>
                  </Group>
                  <Group wrap="nowrap" gap={10} mt={3}>
                    <IconAt stroke={1.5} size="1rem" />
                    <Text fz="xs" c="dimmed">
                      {data.website}
                    </Text>
                  </Group>
                </div>
                <div>
                  <Group mt="xs">
                    <Button
                
                      radius="md"
                      style={{ flex: 1 }}
                      onClick={changeStar}
                    >
                     <PersonIcon style={{ margin: '10px', padding:'1px' }} /> {follow}{" "}
                    </Button>
                    <Button radius="md" color="blue" variant="outline" style={{ flex: 1}} onClick={() => handleDelete(data.index)}>
                    <TrashIcon style={{ margin: '10px', padding:'1px' }} />Delete</Button> 
                  </Group>
                </div>
              </Card>
            ))}
          </SimpleGrid>
        </Grid>
      </CardSection>
    </Card>
  );
};

export default UserCardImage;
