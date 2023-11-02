import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AddIcon from '@mui/icons-material/Add';
import { TypeForFaqs } from '../../../../utils/type'

type Props = {
  ArrayForFAQs: Array<TypeForFaqs>
}

export default function ViewAnswers({ ArrayForFAQs }: Props) {
  return (
    <main className='p-2'>
      <div className='p-1 xl:w-4/5 w-full mx-auto flex flex-col gap-5'>
        {ArrayForFAQs.map((item: TypeForFaqs, index) => {
          return (
            <div className='p-1'>
              <Accordion key={index}>
                <AccordionSummary
                  expandIcon={<AddIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"

                >
                  <div className='my-1'>
                    <p className='text-left font-bold text-lg'>{index +1 } . {item.que}</p>
                  </div>
                </AccordionSummary>
                <AccordionDetails className='bg-slate-200'>
                  <p className='text-left text-lg p-2' dangerouslySetInnerHTML={{ __html: `${item.ans.text}` }}>
                  </p>
                </AccordionDetails>
              </Accordion>
            </div>)
        })}
      </div>
    </main>
  )
}
