'use client'
import { Button, AlertDialog , Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'


const DeleteIssueButton = ({issueId} : {issueId : number}) => {
  const router = useRouter()

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
            <Button color='red' onClick={async ()=>{
              await axios.delete('/api/issues/' + issueId)
              router.push('/issues')
              router.refresh()
            }}>Delete issue</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
      </AlertDialog.Root>
  )
}

export default DeleteIssueButton