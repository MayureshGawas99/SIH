import Chatpage from "../pages/ChatPage";
import React, { useEffect, useState } from "react";
import axios from "axios";
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
  useToast 
} from "@chakra-ui/react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../Context/ChatProvider";

const ProjectUpload = () => {
    const [title, setTitle] = useState('');
    const [mentor, setMentor] = useState('');
    const [description, setDescription] = useState('');
    const [domain, setDomain] = useState([]);
    const [domainEle, setDomainEle] = useState("");
    const [techstack, setTechstack] = useState([]);
    const [techEle, setTechEle] = useState("");
    const [contributors, setContributors] = useState([]);
    const [conEle, setConEle] = useState("");

    const [file, setFile] = useState(null);
  const { user, setUser } = ChatState();
  const navigate = useNavigate();
  const toast = useToast();




  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('domain', domain);
    formData.append('techstack', techstack);
    formData.append('contributors', contributors);
    formData.append('mentors', mentor);
    formData.append('description', description);
    formData.append('pdfFile', file);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/project/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast({
        title: "Project Created Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });

      console.log('File upload success:', response.data);
    } catch (error) {
        toast({
            title: "Error Occured!",
            description: error.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });
      console.error('File upload error:', error);
    }
  };
  const handleAddDomain = () => {
    if (domainEle) {
      setDomain(
         [...domain, domainEle],
      );
      setDomainEle(""); // Clear the input field

    }
  };
  const handleRemoveDomain = (index) => {
    const updatedDomains = domain.filter((_, i) => i !== index);
    setDomain(updatedDomains);
  };

  const handleAddTechstack = () => {
    if (techEle) {
      setTechstack(
         [...techstack, techEle],
      );
      setTechEle(""); // Clear the input field

    }
  };
  const handleRemoveTechstack = (index) => {
    const updatedTech = techstack.filter((_, i) => i !== index);
    setTechstack(updatedTech);
  };

  const handleAddContributor = () => {
    if (conEle) {
      setContributors(
         [...contributors, conEle],
      );
      setConEle(""); // Clear the input field

    }
  };
  const handleRemoveContributor= (index) => {
    const updatedCon = contributors.filter((_, i) => i !== index);
    setContributors(updatedCon); 
  };
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    // <div>
    //   <h2>Upload PDF</h2>
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label>Title:</label>
    //       <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
    //     </div>
    //     <div>
    //       <label>Description:</label>
    //       <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
    //     </div>
    //     <div>
    //       <label>PDF File:</label>
    //       <input type="file" accept=".pdf" onChange={handleFileChange} />
    //     </div>
    //     <button type="submit">Upload</button>
    //   </form>
    // </div>
    <div className="row h-100 w-100">
      <div className="col-md-8">
        <ChakraProvider>
          <Center h="100vh" w="100%">
            {/* Centering the form vertically */}
            <Box
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              boxShadow="lg"
              w="75%"
            >
              <Center>
                <Heading as="h2" size="xl">
                  Project Form
                </Heading>
              </Center>
              <form >
                <Stack spacing={4}>
                  <FormControl>
                    <FormLabel>Project Title</FormLabel>
                    <Input
                      type="text"
                      name="title"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Domains</FormLabel>
                    {domain.map((dom, index) => (
                      <Tag
                        key={index}
                        size="sm"
                        variant="solid"
                        colorScheme="blue"
                        className="me-1"
                      >
                        <TagLabel>{dom}</TagLabel>
                        <TagCloseButton
                          onClick={() => handleRemoveDomain(index)}
                        />
                      </Tag>
                    ))}
                    <Input
                      type="text"
                      value={domainEle}
                      name="domain"
                      onChange={(e) => setDomainEle(e.target.value)}
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
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Tech Stack</FormLabel>
                    {techstack.map((tech, index) => (
                      <Tag
                        key={index}
                        size="sm"
                        variant="solid"
                        colorScheme="blue"
                        className="me-1"
                      >
                        <TagLabel>{tech}</TagLabel>
                        <TagCloseButton
                          onClick={() => handleRemoveTechstack(index)}
                        />
                      </Tag>
                    ))}
                    <Input
                      type="text"
                      value={techEle}
                      name="techstack"
                      onChange={(e) => setTechEle(e.target.value)}
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
                    {contributors.map((con, index) => (
                      <Tag
                        key={index}
                        size="sm"
                        variant="solid"
                        colorScheme="blue"
                        className="me-1"
                      >
                        <TagLabel>{con}</TagLabel>
                        <TagCloseButton
                          onClick={() => handleRemoveContributor(index)}
                        />
                      </Tag>
                    ))}
                    <Input
                      type="text"
                      value={conEle}
                      name="contributors"
                      onChange={(e) => setConEle(e.target.value)}
                      onBlur={handleAddContributor}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleAddContributor();
                        }
                      }}
                    />
                  </FormControl>

                  {/* <FormControl>
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
                  </FormControl> */}

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
                      onChange={(e) => setMentor(e.target.value)}
                    />
                  </FormControl>

                  {/* <FormControl>
                    <FormLabel>Project Related Pictures</FormLabel>
                    <Input
                      type="file"
                      name="projectPictures"
                      onChange={handleFileChange}
                    />
                  </FormControl> */}

                  <FormControl>
                    <FormLabel>Project PDF</FormLabel>
                    <Input
                      type="file" accept=".pdf" onChange={handleFileChange}
                    />
                  </FormControl>

                  <Button colorScheme="blue" onClick={handleSubmit}>
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
