import React, { useState, useEffect } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
/* Import the Amplify Auth API */
import { API, Storage, Auth } from 'aws-amplify';
import {
    Button,
    Flex,
    Heading,
    Image,
    Text,
    TextField,
    View,
    withAuthenticator
} from '@aws-amplify/ui-react';
import { listNotes } from "./graphql/queries";
import {
    createNote as createNoteMutation,
    deleteNote as deleteNoteMutation,
} from "./graphql/mutations";
import { ThemeProvider } from '@aws-amplify/ui-react';

export function Home() {
    const {signOut} = useAuthenticator();
// set state variables for game (thief)
    const hurricaneTheme = {
        name: "hurricane-theme",
        roots: {
            theme: "hurricane"
        },
        state: {
            themeNewHurricane: {
                isMapDetailVisible: false,
            },
            theme: {
                haveGuessedGame1Word1Page1Thief: false,
                isGame1Word1Page1ThiefWrong: true,
                haveGuessedGame1Word2Page1Thief: false,
                isGame1Word2Page1ThiefWrong: true,
                haveGuessedGame1Word3Page1Thief: false,
                isGame1Word3Page1ThiefWrong: true,
                haveGuessedGame1Word4Page1Thief: false,
                isGame1Word4Page1ThiefWrong: true,
                backPackHasItemsThief: false,
                isLightVisibleThief: true,
                isKnobMessageVisible: false,
                isKnobMessageAvailable: false,
                isHoleOpen: false,
                clickCount: 0,
                clickTimeNow: 0,
                clickTimeThen: 0,
                isNotesThiefVisible: false,
                isSafeThiefVisible: false,
                isHint1ThiefVisible: false,
                isHint2ThiefVisible: false,
                isHint3ThiefVisible: false,
                isHint4ThiefVisible: false,
                /* not tracking use for now */
                isHint1ThiefUsed: false,
                isHint2ThiefUsed: false,
                isHint3ThiefUsed: false,
                isHint4ThiefUsed: false,
                totalHintsThief: 0,
            }
        },
        game: {
            backpack: [],
            backpackThief: [],
            thiefNotes: "",
        }
    }
    const [notes, setNotes] = useState([]);
    const [params, setParams] = useState([hurricaneTheme]);
    const [user, setUser] = useState([]);
    console.log("notes: " + notes);
    for (const key in notes) {
        console.log(`${key}: ${notes[key]}`);
        for (const key1 in notes[key]) {
            console.log(`${key1}: ${notes[key][key1]}`);
        }
    }
    console.log("params: " + params);
    for (const key in params) {
        console.log(`${key}: ${params[key]}`);
        for (const key1 in params[key]) {
            console.log(`${key1}: ${params[key][key1]}`);
        }
    }

//get user email
    useEffect(() => {
        getUserInfo();
    }, [])
//const token = JSON.parse(localStorage.getItem(key));
//let emailTemp = token?.body?.decodedToken?.user?.email;
    useEffect(() => {
        fetchNotes();
    }, [user]);

    async function fetchNotes() {
        // Query with filters, limits, and pagination
        let filter = {
            priority: {
                eq: 1 // filter priority = 1
            }
        };
        console.log("user: " + user.username);
        /*for (const key in user) {
            console.log(`${key}: ${user[key]}`);
        }*/
        const apiData = await API.graphql({query: listNotes});
        const notesFromAPI = apiData.data.listNotes.items;
        await Promise.all(
            notesFromAPI.map(async (note) => {
                if (note.image) {
                    const url = await Storage.get(note.name);
                    note.image = url;
                }
                return note;
            })
        );
        setNotes(notesFromAPI);
    }

    async function getUserInfo() {
        Auth.currentAuthenticatedUser({
            bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
        }).then(user => {
            console.log("user: " + user);
            setUser(user)
        })
            .catch(err => {
                // console.log(err)
            });
    }

    async function createNote(event) {
        event.preventDefault();
        const form = new FormData(event.target);
        const image = form.get("image");
        console.log("image: " + image);
        const data = {
            name: form.get("name"),
            description: form.get("description"),
            image: image.name,
        };
        if (!!data.image) await Storage.put(data.name, image);
        await API.graphql({
            query: createNoteMutation,
            variables: {input: data},
        });
        fetchNotes();
        event.target.reset();
    }

    async function deleteNote({id, name}) {
        const newNotes = notes.filter((note) => note.id !== id);
        setNotes(newNotes);
        await Storage.remove(name);
        await API.graphql({
            query: deleteNoteMutation,
            variables: {input: {id}},
        });
    }


    return (
        <ThemeProvider>
            <View className="App">
                <Heading level={1}>My Notes App - {user.username}</Heading>
                <View as="form" margin="3rem 0" onSubmit={createNote}>
                    <Flex direction="row" justifyContent="center">
                        <TextField
                            name="name"
                            placeholder="Note Name"
                            label="Note Name"
                            labelHidden
                            variation="quiet"
                            required
                        />
                        <TextField
                            name="description"
                            placeholder="Note Description"
                            label="Note Description"
                            labelHidden
                            variation="quiet"
                            required
                        />
                        <View
                            name="image"
                            as="input"
                            type="file"
                            style={{alignSelf: "end"}}
                        />
                        <Button type="submit" variation="primary">
                            Create Note
                        </Button>
                    </Flex>
                </View>
                <Heading level={2}>Current Notes</Heading>
                <View margin="3rem 0">
                    {notes.map((note) => (
                        <Flex
                            key={note.id || note.name}
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Text as="strong" fontWeight={700} variation="primary">
                                {note.name}
                            </Text>
                            <Text as="span">{note.description}</Text>
                            {note.image && (
                                <Image
                                    src={note.image}
                                    alt={`visual aid for ${notes.name}`}
                                    style={{width: 400}}
                                />
                            )}

                            <Button variation="link" onClick={() => deleteNote(note)}>
                                Delete note
                            </Button>
                        </Flex>
                    ))}
                </View>


                <Button onClick={signOut}>Sign Out</Button>
            </View>
        </ThemeProvider>
    );
}