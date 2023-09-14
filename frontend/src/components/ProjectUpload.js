import Chatpage from '../pages/ChatPage'
import React, { useEffect, useState } from "react";
import axios from 'axios';
import {
    Box,
    Button,
    ChakraProvider,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Stack,
    Center,
    Heading,
    Tag,
    TagLabel,
    TagCloseButton,
} from "@chakra-ui/react";
import Select from "react-select";
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../Context/ChatProvider';

const ProjectUpload = () => {
    const navigate = useNavigate()
    const dummyContributors = ["Reshma", "Dil", "Narayan"];
    const dummyMentors = ["Madhura", "Manushree"];
    const [formData, setFormData] = useState({
        projectTitle: "",
        domains: [], // Using an array for multiple domains
        description: "",
        techstacks: [], // Using an array for multiple techstacks
        dateOfUpload: "",
        contributors: [],
        mentor: "",
        projectPictures: null,
        projectPdf: null,
    });
    const { user,setUser } = ChatState();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);

        if (!user) {
            navigate("/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData({
            ...formData,
            [e.target.name]: e.target.type === "file" ? files[0] : e.target.value,
        });
    };

    const handleAddDomain = () => {
        if (formData.domain) {
            setFormData({
                ...formData,
                domains: [...formData.domains, formData.domain],
                domain: "", // Clear the input field
            });
        }
    };

    const handleRemoveDomain = (index) => {
        const updatedDomains = formData.domains.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            domains: updatedDomains,
        });
    };

    const handleAddTechstack = () => {
        if (formData.techstack) {
            setFormData({
                ...formData,
                techstacks: [...formData.techstacks, formData.techstack],
                techstack: "", // Clear the input field
            });
        }
    };

    const handleRemoveTechstack = (index) => {
        const updatedTechstacks = formData.techstacks.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            techstacks: updatedTechstacks,
        });
    };const handleAddContributor = () => {
        if (formData.contributor) {
            setFormData({
                ...formData,
                contributors: [...formData.contributors, formData.contributor],
                contributor: "", // Clear the input field
            });
        }
    };

    const handleRemoveContributor = (index) => {
        const updatedContributor = formData.contributors.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            contributors: updatedContributor,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // You can handle form submission logic here
        const form = new FormData();
        form.append('pdf', formData.projectPdf);

        console.log(formData);

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/project/create`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${user.token}`,

                },
            });
            alert('File uploaded successfully');
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file');
        }


    };
    return (
        <div className="row h-100 w-100">
            <div className="col-md-8">
                <ChakraProvider>
                    <Center h="100vh" w="100%">
                        {/* Centering the form vertically */}
                        <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="lg" w="75%">
                            <Center>
                                <Heading as="h2" size="xl">
                                    Project Form
                                </Heading>
                            </Center>
                            <form onSubmit={handleSubmit}>
                                <Stack spacing={4}>
                                    <FormControl>
                                        <FormLabel>Project Title</FormLabel>
                                        <Input
                                            type="text"
                                            name="projectTitle"
                                            value={formData.projectTitle}
                                            onChange={handleChange}
                                        />
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Domain</FormLabel>
                                        {formData.domains.map((domain, index) => (
                                            <Tag
                                                key={index}
                                                size="sm"
                                                variant="solid"
                                                colorScheme="blue"
                                            >
                                                <TagLabel>{domain}</TagLabel>
                                                <TagCloseButton
                                                    onClick={() => handleRemoveDomain(index)}
                                                />
                                            </Tag>
                                        ))}
                                        <Input
                                            type="text"
                                            name="domain"
                                            value={formData.domain}
                                            onChange={handleChange}
                                            onBlur={handleAddDomain}
                                            onKeyPress={(e) => {
                                                if (e.key === "Enter") {
                                                    handleAddDomain();
                                                }
                                            }}
                                        />
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Description</FormLabel>
                                        <Textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                        />
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Techstack</FormLabel>
                                        {formData.techstacks.map((techstack, index) => (
                                            <Tag
                                                key={index}
                                                size="sm"
                                                variant="solid"
                                                colorScheme="blue"
                                            >
                                                <TagLabel>{techstack}</TagLabel>
                                                <TagCloseButton
                                                    onClick={() => handleRemoveTechstack(index)}
                                                />
                                            </Tag>
                                        ))}
                                        <Input
                                            type="text"
                                            name="techstack"
                                            value={formData.techstack}
                                            onChange={handleChange}
                                            onBlur={handleAddTechstack}
                                            onKeyPress={(e) => {
                                                if (e.key === "Enter") {
                                                    handleAddTechstack();
                                                }
                                            }}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Contributors</FormLabel>
                                        {formData.contributors.map((con, index) => (
                                            <Tag
                                                key={index}
                                                size="sm"
                                                variant="solid"
                                                colorScheme="blue"
                                            >
                                                <TagLabel>{con}</TagLabel>
                                                <TagCloseButton
                                                    onClick={() => handleRemoveContributor(index)}
                                                />
                                            </Tag>
                                        ))}
                                        <Input
                                            type="text"
                                            name="contributor"
                                            value={formData.contributor}
                                            onChange={handleChange}
                                            onBlur={handleAddContributor}
                                            onKeyPress={(e) => {
                                                if (e.key === "Enter") {
                                                    handleAddContributor();
                                                }
                                            }}
                                        />
                                    </FormControl>

                                    {/* <FormControl>
                                        <FormLabel>Contributors</FormLabel>
                                        <Select
                                            name="contributors"
                                            value={formData.contributors}
                                            options={dummyContributors.map((contributor) => ({
                                                value: contributor,
                                                label: contributor,
                                            }))}
                                            onChange={(selectedOption) =>
                                                setFormData({
                                                    ...formData,
                                                    contributors: selectedOption.value,
                                                })
                                            }
                                        />
                                    </FormControl> */}
                                    

                                    {/* <FormControl>
                                        <FormLabel>Mentor</FormLabel>
                                        <Select
                                            name="mentor"
                                            value={formData.mentor}
                                            options={dummyMentors.map((mentor) => ({
                                                value: mentor,
                                                label: mentor,
                                            }))}
                                            onChange={(selectedOption) =>
                                                setFormData({
                                                    ...formData,
                                                    mentor: selectedOption.value,
                                                })
                                            }
                                        />
                                    </FormControl> */}
                                    <FormControl>
                                        <FormLabel>Mentor</FormLabel>
                                        <Input
                                            name="mentor"
                                            value={formData.mentor}
                                            onChange={handleChange}
                                        />
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Project Related Pictures</FormLabel>
                                        <Input
                                            type="file"
                                            name="projectPictures"
                                            onChange={handleFileChange}
                                        />
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Project PDF</FormLabel>
                                        <Input
                                            type="file"
                                            name="projectPdf"
                                            onChange={handleFileChange}
                                        />
                                    </FormControl>

                                    <Button colorScheme="blue"  onClick={handleSubmit}>
                                        Submit
                                    </Button>
                                </Stack>
                            </form>
                        </Box>
                    </Center>
                </ChakraProvider>
            </div>
            <div className="col-md-4 border-start">
                <Chatpage />
            </div>
        </div>
    )
}

export default ProjectUpload