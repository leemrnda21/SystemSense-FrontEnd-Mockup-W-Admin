# 🍽️ QR Code Restaurant Menu System

A modern, full-featured restaurant menu application with QR code scanning, admin panel, and multi-language support.

## ✨ Features

### 🎯 Customer Features
- **QR Code Integration** - Scan QR codes to access the menu instantly
- **Digital Menu Display** - Beautiful, responsive menu interface
- **Shopping Cart** - Add items to cart and manage quantities
- **Multi-Language Support** - English, Japanese, and Thai translations
- **Order History** - Track previous orders
- **Mobile Optimized** - Fully responsive design for all devices

### 👨‍💼 Admin Features
- **Admin Dashboard** - Manage entire menu system
- **Menu Management** - Add, edit, and delete menu items
- **Real-time Updates** - Changes reflect immediately
- **Category Management** - Organize items by category
- **Price Management** - Update prices easily
- **Menu Analytics** - View menu statistics and insights

### 🎨 Design Features
- **Modern Dark Theme** - Professional purple and slate gradient design
- **Smooth Animations** - Engaging hover effects and transitions
- **Gradient UI** - Beautiful gradient backgrounds throughout
- **Responsive Layout** - Works seamlessly on desktop, tablet, and mobile
- **Accessibility** - WCAG compliant color contrasts and interactions

## 🚀 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) - React framework for production
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- **Language:** [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **State Management:** Zustand - Lightweight state management
- **Icons:** [Lucide React](https://lucide.dev/) - Beautiful SVG icons
- **Storage:** LocalStorage - Client-side data persistence

## 📋 Getting Started

### Prerequisites
- Node.js 18+ and npm or pnpm
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/leemrnda21/SystemSense-FrontEnd-Mockup-W-Admin.git
cd SystemSense-FrontEnd-Mockup-W-Admin
```

2. **Install dependencies**
```bash
npm install
# or
pnpm install
```

3. **Run the development server**
```bash
npm run dev
# or
pnpm dev
```

4. **Open in browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Admin Access

To access the admin panel:

1. Click the **Admin** button in the top-right corner of the homepage
2. Enter the admin password: `admin123`
3. You now have access to:
   - Dashboard with menu statistics
   - Add new menu items
   - Edit existing items
   - Delete items
   - Manage categories and prices

## 📁 Project Structure

```
.
├── app/
│   ├── page.tsx              # Homepage with admin access
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── calculator.tsx        # Calculator component
│   ├── report-generator.tsx  # Report generation
│   └── remove-branding.ts    # Branding utilities
├── components/
│   ├── menu-display.tsx      # Main menu interface
│   ├── admin-panel.tsx       # Admin dashboard
│   ├── qr-scanner.tsx        # QR code scanning
│   ├── theme-provider.tsx    # Theme configuration
│   └── ui/                   # Reusable UI components
├── store/
│   └── menu-store.ts         # Zustand state management
├── context/
│   └── language-context.tsx  # Multi-language support
├── hooks/
│   ├── use-toast.ts          # Toast notifications
│   └── use-mobile.ts         # Mobile detection
├── translations/
│   └── index.ts              # Language translations
└── public/                   # Static assets
```

## 🎯 Usage Guide

### For Customers

1. **View Menu**
   - Click "View Sample Menu" on homepage
   - Browse items by category
   - Click any item to see details

2. **Add to Cart**
   - Select desired quantity
   - Click "Add to Cart"
   - Item added with price calculation

3. **Checkout**
   - Click shopping cart icon
   - Review items and total
   - Complete order

4. **Change Language**
   - Use language selector buttons (EN, JA, TH)
   - Menu updates instantly

### For Admin

1. **Access Dashboard**
   - Click Admin button → Enter password
   - View statistics and menu overview

2. **Add Menu Item**
   - Fill in name, price, category, description
   - Click "Add Item"
   - Item appears immediately in menu

3. **Edit Item**
   - Click edit icon on item card
   - Modify details
   - Click "Update Item"

4. **Delete Item**
   - Click trash icon on item card
   - Item removed from menu

## 🎨 Customization

### Change Admin Password
Edit `app/page.tsx` line 23:
```typescript
if (password === "admin123") {  // Change this password
```

### Add New Categories
Edit `components/menu-display.tsx` - add to `CATEGORIES` array:
```typescript
{ id: "newcategory", name: "newcategory", color: "bg-color-100 text-color-800" }
```

### Customize Colors
All colors use Tailwind CSS classes. Edit `tailwind.config.ts` or change class names in components.

## 🌐 Multi-Language Support

Currently supports:
- 🇬🇧 English
- 🇯🇵 Japanese
- 🇹🇭 Thai

Add more languages in `translations/index.ts`:
```typescript
export const translations = {
  en: { /* English */ },
  ja: { /* Japanese */ },
  th: { /* Thai */ },
  // Add more languages here
}
```

## 💾 Data Storage

- **Menu items** stored in browser's localStorage
- **Cart data** managed by Zustand
- **Order history** stored in component state
- Data persists across page reloads but is cleared on browser cache clear

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Visit [https://vercel.com](https://vercel.com)
3. Connect GitHub and select this repo
4. Click Deploy
5. Your app is live! 🎉

### Deploy to Netlify

1. Connect GitHub repo to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Deploy!

## 📱 Features Showcase

### Menu Display
- ✅ Grid layout with 2-column on desktop
- ✅ Smooth hover animations
- ✅ Category filtering
- ✅ Vegetarian badges
- ✅ Price highlighting

### Admin Panel
- ✅ Dark theme dashboard
- ✅ Real-time statistics
- ✅ Inline editing
- ✅ Beautiful cards and gradients
- ✅ Responsive forms

## 🔄 Future Enhancements

- [ ] Backend database integration
- [ ] Payment processing
- [ ] Image uploads for menu items
- [ ] Advanced analytics
- [ ] Table management
- [ ] Reservation system
- [ ] Staff role management
- [ ] Order notifications

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created by **leemrnda21**

## 📧 Contact & Support

For questions or support, please open an issue on GitHub.

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)
- Component library from shadcn/ui

---

**Happy Coding! 🚀**

Made with ❤️ for better dining experiences
