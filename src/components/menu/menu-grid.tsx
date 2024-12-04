import { useNavigate } from 'react-router-dom';
import { 
  Gauge,
  Wrench,
  ArrowsLeftRight,
  ArrowsOut,
  Package,
  MapPin,
  Scan,
  Tag,
  Cube,
  Gear
} from '@phosphor-icons/react';
import { MenuItem } from './menu-item';
import { ROUTES } from '@/lib/constants';

export function MenuGrid() {
  const navigate = useNavigate();

  const menuItems = [
    { 
      icon: Gauge, 
      label: 'Avancement du soudage',
      onClick: () => navigate(ROUTES.WELDING_PROGRESS)
    },
    { icon: Wrench, label: 'Avancement de l\'assemblage' },
    { icon: ArrowsLeftRight, label: 'Transactions' },
    { icon: ArrowsOut, label: 'Déplacer' },
    { icon: Package, label: 'Inventaire par produit' },
    { icon: MapPin, label: 'Inventaire par localisation' },
    { icon: Scan, label: 'Scanner' },
    { icon: Tag, label: 'Localisation des marques' },
    { icon: Cube, label: 'Localisation des contenants' },
    { icon: Gear, label: 'Localisation des équipements' },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 p-3">
      {menuItems.map((item) => (
        <div key={item.label} className="aspect-square w-full max-w-[102px] mx-auto">
          <MenuItem
            icon={item.icon}
            label={item.label}
            onClick={item.onClick}
          />
        </div>
      ))}
    </div>
  );
}