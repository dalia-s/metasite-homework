import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import userpic from '../../images/userpic.jpg'
import { ServiceContext } from '../../services/context'
import { ContactDetails } from '../../services/service'
import { abbreviateName } from '../../utils'

const PreviewContainer = styled.div`
  width: 0;
  background-color: ${props => props.theme.colors.gray};
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0 0 ${props => props.theme.dimensions.borderRadius} 0;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, .2);
  overflow: hidden;
  transition: width 0.3s;

  &.expanded {
    width: ${props => props.theme.dimensions.previewWidth};
  }
`

const PreviewHeader = styled.div`
  width: 100%;
  height: ${props => props.theme.dimensions.tableHeaderHeight};
  background-color: ${props => props.theme.colors.accentGreen};
`

const ImageContaner = styled.div`
  height: 12em;
  width: 12em;
  border: 8px solid ${props => props.theme.colors.white};
  border-radius: 50%;
  overflow: hidden;
  margin: 15px 0;
`

const Image = styled.img`
  width: 100%;
`

const PreviewTable = styled.table`
  width: 275px;
  table-layout: fixed;
  margin-bottom: 20px;
`

const ContactRow = styled.tr`
  height: 28px;
`

const LabelCell = styled.td`
  text-align: right;
  width: 80px;
`

const ContactCell = styled.td`
  padding-left: 20px;
  color: ${props => props.theme.colors.black};
  width: 160px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const Link = styled.a`
  color: ${props => props.theme.colors.backgroundGradientTo};
`

interface PreviewProps {
  contactId: string
}

export function Preview(props: PreviewProps) {
  const service = useContext(ServiceContext)
  const [contactDetails, setContactDetails] = useState<ContactDetails|null>(null)

  async function getData() {
    try {
      const data = await service.getContactDetails(props.contactId)
      setContactDetails(data)
    } catch {
      alert('Oops! We could not load the contact preview. Please try again later.')
    }
  }

  useEffect(() => {
    if (!!props.contactId) {
      getData()
    } else {
      setContactDetails(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.contactId])

  const placeHolder = '-'
  const fullName = contactDetails ? `${contactDetails.name} ${abbreviateName(contactDetails.surname)}` : placeHolder

  return (
    <PreviewContainer className={!!props.contactId ? 'expanded' : ''}>
      <PreviewHeader />
      <ImageContaner>
        <Image src={userpic} />
      </ImageContaner>
      <PreviewTable id="preview-table">
        <tbody>
          <ContactRow>
            <LabelCell>Name:</LabelCell>
            <ContactCell>{fullName}</ContactCell>
          </ContactRow>
          <ContactRow>
            <LabelCell>City:</LabelCell>
            <ContactCell>{contactDetails?.city || placeHolder}</ContactCell>
          </ContactRow>
          <ContactRow>
            <LabelCell>Email:</LabelCell>
            <ContactCell>
              {!!contactDetails?.email &&
                <Link href={`mailto: ${contactDetails?.email}`}>
                  {contactDetails?.email || placeHolder}
                </Link>}
              {!contactDetails?.email && placeHolder}
            </ContactCell>
          </ContactRow>
          <ContactRow>
            <LabelCell>Phone:</LabelCell>
            <ContactCell>{contactDetails?.phone || placeHolder}</ContactCell>
          </ContactRow>
        </tbody>
      </PreviewTable>
    </PreviewContainer>
  )
}