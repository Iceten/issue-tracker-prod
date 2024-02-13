'use client'
import { Spinner } from '@/app/components'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'


const DeleteIssueButton = ({issueId} : {issueId : number}) => {
  const router = useRouter();
  const [error, setError]=useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const deleteIssue= async ()=>{
    try {
      setIsDeleting(true)
      await axios.delete('/api/issues/' + issueId)
      router.push('/issues')
      router.refresh()  
    } catch (error) {
      setIsDeleting(false)
      setError(true)
    }
  }

  return (
    <>
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red" disabled={isDeleting}>Delete issue {isDeleting && <Spinner/>}</Button> 
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
            <Button color='red' onClick={deleteIssue}>Delete issue</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>This issue couldn't be deleted</AlertDialog.Description>
          <Button color='gray' variant='soft' onClick={()=> setError(false) } mt="2">OK</Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}

export default DeleteIssueButton