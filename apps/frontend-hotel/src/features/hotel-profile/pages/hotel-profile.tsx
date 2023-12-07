import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useAuthStore } from '@hotel/features/auth/store/auth';

import { getHotelProfile } from '../api/get-profile';
import { getPropertyCategories } from '../api/get-property-categories';
import { DescriptionForm } from '../components/description-form';
import { GeneralForm } from '../components/general-form';
import { PropertiesForm } from '../components/properties-form';
import { SidebarNav } from '../components/sidebar-nav';

let sidebarNavItems = [
  {
    title: 'General',
    href: '/profile/general',
  },
  {
    title: 'Description',
    href: '/profile/description',
  },
];

function HotelProfilePage() {
  const [categories, setCategories] = useState<any>([]);
  const [properties, setProperties] = useState<any>([]);
  const [profile, setProfile] = useState<any>({});
  const location = useLocation();
  const userAuth = useAuthStore((state) => state.user);

  const myPath = location.pathname.split('/');
  // get last item in array
  const selectedNav = myPath[myPath.length - 1];
  console.log('myPropertyCategory', selectedNav);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getPropertyCategories();
      let myNavItems = [...sidebarNavItems];

      console.log('response ############', response);

      response.forEach((category) => {
        myNavItems.push({
          title: category.name,
          href: '/profile/' + category.url,
        });
      });

      setCategories(myNavItems);
      setProperties(response);
    };

    const fetchProfile = async () => {
      const response = await getHotelProfile(userAuth?.hotelsAsAdmin[0].id);
      setProfile(response);
    };
    fetchCategories();
    fetchProfile();
  }, []);

  console.log('properties parent', properties);

  return (
    <div className="py-6 h-full space-y-2 space-x-4 justify-start flex">
      <SidebarNav items={categories} />
      <div className="w-[800px]">
        {selectedNav === 'general' && <GeneralForm profile={profile} />}
        {selectedNav === 'description' && <DescriptionForm profile={profile} />}

        {selectedNav !== 'general' && (
          <PropertiesForm
            properties={properties}
            selectedNav={selectedNav}
            profile={profile}
          />
        )}
      </div>
    </div>
  );
}

export default HotelProfilePage;
