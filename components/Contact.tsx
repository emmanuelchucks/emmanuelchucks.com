import {
  Stack,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormErrorMessage,
  Button,
  Box,
} from "@chakra-ui/react";

function Contact() {
  return (
    <Stack maxW="40ch">
      <Box mb={10}>
        <Heading>Contact</Heading>
        <Text>Let's get in touch</Text>
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
        <Button colorScheme="teal" size="md">
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
        <Textarea placeholder={placeholder} />
      ) : (
        <Input placeholder={placeholder} />
      )}
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}

export default Contact;
