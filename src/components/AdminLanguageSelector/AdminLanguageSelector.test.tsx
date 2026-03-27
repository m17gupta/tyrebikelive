// import { render, fireEvent, screen } from '@testing-library/react';
// import AdminLanguageSelector from './index';

// // Mock next/navigation
// jest.mock('next/navigation', () => ({
//   useRouter: () => ({ push: jest.fn() }),
//   usePathname: () => '/admin/en/collections/pages',
// }));

// describe('AdminLanguageSelector', () => {
//   it('renders current language label', () => {
//     render(<AdminLanguageSelector />);
//     expect(screen.getByText('English')).toBeInTheDocument();
//   });

//   it('shows dropdown and switches language', () => {
//     render(<AdminLanguageSelector />);
//     fireEvent.click(screen.getByText('English'));
//     expect(screen.getByText('Hrvatski')).toBeInTheDocument();
//     expect(screen.getByText('Polski')).toBeInTheDocument();

//     fireEvent.click(screen.getByText('Hrvatski'));
//     // The push function should be called with the new path
//     // (simulate pathname replacement)
//     // You can enhance this test to check the actual push call if needed
//   });
// });

