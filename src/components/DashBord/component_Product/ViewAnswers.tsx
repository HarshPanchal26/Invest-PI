import React from 'react'
import { PlusIcon } from '@heroicons/react/20/solid';
import { IconButton } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';

const ArrayForQuestion = [
  { id: 1 },
  { id: 1 },
  { id: 1 },
  { id: 1 },
  { id: 1 },
  { id: 1 },
]


export default function ViewAnswers() {
  return (
    <main className='p-2'>
      <div className='p-1 md:w-4/5 w-full mx-auto flex flex-col gap-4'>
        {ArrayForQuestion.map((item, index) => {
          return (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<AddIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"

              >
                <div className='my-1'>
                  <p className='text-left font-bold my-2'>Q-1.</p>
                  <p className='text-left font-bold text-lg'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur eius, laborum quos excepturi nemo voluptatibus dolorum id voluptates neque ipsam?</p>
                </div>
              </AccordionSummary>
              <AccordionDetails className='bg-slate-200'>
                <p className='text-left text-lg'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, repudiandae laboriosam veritatis possimus mollitia aliquam dolor, consequatur saepe, recusandae enim rerum dolorem deserunt excepturi earum. Inventore tenetur natus vero esse. Tempora soluta doloremque atque exercitationem laudantium dolores vero? Harum animi eveniet ipsum eum ullam inventore a facilis quis voluptates, molestias cupiditate corporis distinctio nihil blanditiis omnis accusantium expedita possimus, voluptas iure dicta. Corporis quas quae expedita ipsum accusantium placeat delectus, enim quos harum cupiditate quam recusandae dolores atque numquam commodi suscipit illum porro earum beatae debitis voluptatibus! Esse deserunt in molestias neque praesentium. Ratione vel ducimus pariatur provident asperiores officia cupiditate iusto voluptatem? Ea quos suscipit ratione, necessitatibus laudantium esse quidem voluptatum excepturi! Minus ratione harum quaerat ipsa officiis molestiae obcaecati provident culpa assumenda quidem aliquid praesentium ex quod tenetur aperiam saepe ullam, repudiandae veniam error unde possimus ad voluptate? Nam odit nesciunt nostrum aliquid quia. Ducimus iste repellendus perferendis. Accusamus, vero obcaecati? Voluptas hic sit iusto repudiandae necessitatibus modi eligendi aliquid fugit cupiditate officiis? Quam eaque facere ut, magnam libero vero eius. Eum facere nesciunt quia optio ratione, incidunt voluptates cum ut accusamus! In doloribus repellat sit magnam tempore, quibusdam repudiandae tenetur neque molestiae temporibus fugit quaerat, perferendis libero!
                </p>
              </AccordionDetails>
            </Accordion>)
        })}
      </div>
    </main>
  )
}
