import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";

function Contact() {
  return (
    <Stack maxW="40ch" id="contact">
      <Box mb={10}>
        <Heading>Contact</Heading>
        <Text>Let&apos;s get in touch</Text>
      </Box>

      <Stack spacing={6}>
        <InputField id="name" label="Name" placeholder="Leonardo DaVinci" />
        <InputField id="email" label="Email" placeholder="leonardo@email.com" />
        <InputField
          isTextarea
          id="message"
          label="Message"
          placeholder="Tell me what we need to work on"
        />
        <Button bg="green.600" color="white" size="md" w="50%">
          Send
        </Button>
      </Stack>
    </Stack>
  );
}

type InputFieldProps = {
  id: string;
  label: string;
  placeholder: string;
  isTextarea?: boolean;
  error?: string;
};

function InputField({
  id,
  label,
  placeholder,
  isTextarea,
  error,
}: InputFieldProps) {
  return (
    <FormControl id={id} isRequired>
      <FormLabel>{label}:</FormLabel>
      {isTextarea ? (
        <Textarea placeholder={placeholder} h="20vh" />
      ) : (
        <Input placeholder={placeholder} />
      )}
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}

export default Contact;
