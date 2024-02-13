'use client'
import { Button, AlertDialog , Flex } from '@radix-ui/themes'


const DeleteIssueButton = ({issueId} : {issueId : number}) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red"> Delete issue</Button> 
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>
          Confirmation of Deletion
        </AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this issue?
        </AlertDialog.Description>
        <Flex mt='4' gap='4'>
          <AlertDialog.Cancel>
            <Button variant='soft' color='gray'>cancel</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color='red'>Delete issue</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
      </AlertDialog.Root>
  )
}

export default DeleteIssueButton