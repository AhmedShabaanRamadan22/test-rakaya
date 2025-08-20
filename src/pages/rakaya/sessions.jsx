import Container from "@/components/Container";
import CustomHead from "@/components/CustomHead";
import Header from "@/components/jobs/Header";
import VisionLayout from "@/components/vision/VisionLayout";
import Card from "@/components/vision/services/Card";

const Meetings = () => {
  const description = "تعقد ركايا جلسات مع أعضاء فريقها تشجعهم فيها على الحوار المفتوح و تعزبز الإبداع وتبادل الأفكار"
  return (
    <>
      <CustomHead title={"جلسات"} description={description} />

      <Header text={"جلسات"} />

      <VisionLayout title="جلسات">
        <Container className="mt-3 col-12 col-md-10 d-flex flex-wrap justify-content-center justify-content-lg-start mx-0 gap-3">
          <ul className=" mx-2 px-0 mx-md-4">
            <li className="text-justify">
              <strong>جلسة المرآة: </strong> يلتقي الرئيس التنفيذي أو المدراء مع
              كل موظف بشكل منفصل. هذه اللقاءات تعقد مرة في الشهر، وقد تجرى في
              المكتب أو في مقهى أو مطعم. الغرض من هذه اللقاءات هو تبادل الآراء
              بين الموظفين والإدارة. يقدم المدير تقييمه لأداء الموظف، وبالمقابل
              يعبر الموظف عن رأيه في أداء المدير. يُشجع الطرفان على التعبير عن
              أفكارهما بصدق ووضوح.
            </li>
            <li className="mt-3 text-justify">
              <strong>جلسة الشاي: </strong>
              هذه الجلسة تهدف إلى تعزيز التواصل الفعّال وتبادل الآراء بين أعضاء
              فريقنا في بيئة مريحة وودية. من خلال تخصيص وقت للجلوس معًا
              والاستمتاع بفنجان من الشاي، نحن نشجع على الحوار المفتوح والصريح،
              مما يساعد في تعزيز الإبداع وتبادل الأفكار بطريقة فعالة. نؤمن بأن
              هذه الجلسة ستكون أداة قيمة لتقوية روابط العمل وتحفيز الابتكار داخل
              شركتنا.
            </li>
            <li className="mt-3 text-justify">
              <strong>الزمكان: </strong>يجتمع فريق ركايا كاملاً مرة كل شهر
              للمشاركة في جلسة خاصة وفريدة من نوعها. هذه الجلسات ليست مقتصرة فقط
              على مناقشة الأعمال ومشاريع ركايا، بل تتجاوز ذلك لتشمل التحديات
              الشخصية، المغامرات، اللحظات المضحكة وحتى تلك المؤثرة التي مر بها
              أعضاء الفريق خلال الشهر الماضي. الهدف من هذا الاجتماع هو خلق جو من
              الانفتاح والصداقة، حيث لا توجد أجندة محددة، مما يسمح للأفكار
              والمشاعر بالتدفق بحرية ويعزز من روح الفريق والترابط بين أعضائه.
            </li>
          </ul>
        </Container>
      </VisionLayout>
    </>
  );
};

export default Meetings;
