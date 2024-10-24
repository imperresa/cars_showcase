'use client'
import { SearchManuFacturerProps } from '@/types'
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, Transition } from '@headlessui/react'
import { useState, Fragment } from 'react'
import { manufacturers } from '@/constants'
import Image from 'next/image'


const SearchManufacturer = ({ manufacturer, setManuFacturer }: SearchManuFacturerProps) => {
  const [query, setQuery] = useState('')
  const filteredManufacturers = query === ''
    ? manufacturers
    : manufacturers.filter((item) => (
      item.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
    ))


  return (
    <div className='search-manufacturer'>
      <Combobox value={manufacturer} onChange={setManuFacturer}>
        <div className='relative w-full'>
          <ComboboxButton className='absolute top-[14px]'>
            <Image src='/car-logo.svg'
              alt='Car logo'
              width={20}
              height={20}
              className='ml-4'
            />
          </ComboboxButton>
          <ComboboxInput className='search-manufacturer__input'
            placeholder='Volkswagen'
            displayValue={(manufacturer: string) => manufacturer}
            onChange={(e) => setQuery(e.target.value)} />

          <Transition as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={() => setQuery('')}>
            <ComboboxOption>
              {(filteredManufacturers.map((item) => (
                <ComboboxOption key={item}
                  className={ `relative search-manufacturer__option hover:bg-primary-blue hover:text-white  text-black-100`
                  }
                  value={item}
                >
                  {({ selected, active }) => (
                      <>
                        <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                          {item}
                        </span>
                        {selected ? (
                          <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active? "text-white": "text-pribg-primary-purple"}`}
                          ></span>
                        ) : null}
                      </>
                    )}
                </ComboboxOption>
              )))}
            </ComboboxOption>

          </Transition>
        </div>
      </Combobox>

    </div>
  )
}

export default SearchManufacturer 

