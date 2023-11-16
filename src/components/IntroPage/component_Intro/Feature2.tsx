import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Businesses',
    description:
      'Through our platform businesses can get funds to grow their business. Businesses can tie up with investors from any region on our platform. All of these processes will save time and be done online on our platform.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Investor',
    description:
      'Any investor can invest in any suitable business from their preferred / favorite field. According to their budget, Investors can tie up with business from any region on our platform.',
    icon: LockClosedIcon,
  },
  {
    name: 'Populars',
    description:
    'Populars will be a term that will be operated as a basic account but it will help to make our platform constant and habitual',
    icon: ArrowPathIcon,
  },
  // {
  //   name: 'Advanced security',
  //   description:
  //     'Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.',
  //   icon: FingerPrintIcon,
  // },
]

export default function Feature2() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Audience</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Tragte Audience
          </p>
          {/* <p className="mt-6 text-lg leading-8 text-gray-600">
            Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum
            pulvinar et feugiat blandit at. In mi viverra elit nunc.
          </p> */}
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="font-bold leading-7 text-gray-900 text-lg">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
