import BrandDisclaimer from '../../components/BrandDisclaimer';
import Equipment from '../../components/Equipment';
import PoweredByTechnology from '../../components/PoweredByTechnology';

export default async function Page() {
  return (
    <div className='d-xl-block pb-3 text-center'>
      <div className='pb-3 text-center'>
        <p className='h1'>Kentobeans7</p>
        Kentobeans7 is a music streamer and drummer from Nashville, TN.
      </div>
      <Equipment />
      <hr />
      <PoweredByTechnology />
      <BrandDisclaimer />
    </div>
  );
}
