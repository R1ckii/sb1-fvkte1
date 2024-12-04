import { PageContainer } from '@/components/layout/page-container';
import { MenuGrid } from '@/components/menu/menu-grid';

export function HomePage() {
  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto px-4">
        <MenuGrid />
      </div>
    </PageContainer>
  );
}
