import React,{Fragment} from 'react';
import {useNavigate} from 'react-router-dom'

import '../../asset/css/custom.css'

import cogoToast from 'cogo-toast';
import { userRegistration } from '../../APIServices/UserAPIServices';

const Registration = () => 
{
    var navigate = useNavigate();


    var registrationFunc = ()=>
    {
        

        let checkboxes= document.querySelectorAll('input[name="access"]:checked');
        let accessibility= [];

        checkboxes.forEach
        (
            (checkbox) => 
            {
                accessibility.push(checkbox.value);
            }
        );
        

        var firstName = document.querySelector('.firstName').value;
        var lastName = document.querySelector('.lastName').value;
        var email = document.querySelector('.email').value;
        var mobile = document.querySelector('.mobile').value;
        var password = document.querySelector('.password').value;
        var role = document.querySelector('.selectRole').value;
        
        var photo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAIAAADTED8xAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjNDMjZDMTZCRTFBODExRTQ5RDk2OUYyNzUwNDFFQ0NCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjNDMjZDMTZDRTFBODExRTQ5RDk2OUYyNzUwNDFFQ0NCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6M0MyNkMxNjlFMUE4MTFFNDlEOTY5RjI3NTA0MUVDQ0IiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6M0MyNkMxNkFFMUE4MTFFNDlEOTY5RjI3NTA0MUVDQ0IiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz783G2YAAAnvUlEQVR42ux9Z5PjRpJ2VcER9LbtGEmzu7dxF/H+/z+x327jFHdaraTRTFu2ZZMgQFS95QAU6Jo904YEMjXisDlsEoXKJ12lwf/4588ICKisROAWAAEAgIAAAEBAAAAgIAAAEBAAAAgIAAAEBAAAAgIAAAEBAICAAABAQAAAICAAABAQAAAICAAABAQAAAICAAABAQCAgAAAQEAAACAgAAAQEAAACAgAAAQEAAACAgAAAQEAgIAAAEBAAAAgIAAAEBAAAAgIAAAEBAAAAgIAAAEBAICAAABAQACAghLGmD8yxuBWAADKSIr1FQyAAABlFP9AAICSyv5FywdsIQBAicT/IruDTgAAgFEEBAAoyR4QMsf3YAK9GtlwC97cC3Bd18bEcRzbtuM4DqIwCAKAAABg260USqmQ2UQb8VjzLF5j6LuuU/UqfsX1PK/i2n7FX2XrRPEsnM44EjgexpPpZDKZyU+giAmNQR/HB5MfjQFIAICXIM6I2CIspphyCAgwIHWYhTXPSaanhCHf92t1v11rVCoVy8pb92wpXgQ5lu1U7Vq1wrRRhMbT6cPDw3gc3N3fx/I3TRbnAOPAUDElhTeMwJHYQJD9458/w134FsNFMjpnZ6kHiOI5Jp6KvzgvNqq1bqfFHy2bv2u5V6uY9fHvyr8tpuh2dH91c33/MBFfJsE2J+mlwlG/BTAAALyMCZQe36Y+K3/uWlav2+bk2RZOxby0jEw+Ttn129hTfVQ0o9d3t2fDqyiKpDbAqTaQtpl8wgAAAICX0ACpyYGI9AIoN+4P9getWnWpUE+5f0Opv+E1KNVyeX1zfjEM4xml4qqolP3CPINwKgDgpUhyvYABwhXH4azfbTaWs6kh6b+H++cglPsoxn0SdHV7e3Z+GcSR+jauDbgHQgECAICX8wG4eb+/19/rdfFjTi37VoNnDjMp96enBpm/i1FI2dfTk6ubOxmUYqABAAAvpgAYqlb9D0eHFc8RMSH92jIWz/O+IcjRk/hzFUMnH0/lv4s3XF3f//H1CzeARMwUnOC1BGHQxxlPWRMIU8mC4hnn3cO9zmAwIErQIpKaOEuYGs97z8mTJ7vdy19PbTKsNVCnXXecD7/+8Xnuu7GEBILDAVOQwS14lPGUfJVBT258cCZiH48P9wZ7JDUz8CM8+jpOubpWdUn1evXD+2NiKA0zWgWpFgCAzTmLpIaGNPrJTz9+7LaaOO+VvjlXmYyukNCq1/cGPXFCJz2W5LhaHV+AXQQA2JSzBAMpG99C6NPHj82qLw1uNsdzW7e1mNtpg1qlAnsIAPguZzdhccaNilrVlaKUKLvHlPrbAIM5LcQvaH9vjzEKxg8A4BuJYm05HB8ctht1xGLN6HgbZf9iQnWrXq04bhoLAuMHAPBEAMhwTa/V2uu2pHFtbbkcnUvQ4KqqUa8C3wMAvlWmEtu17PeHezrNxjyKeswCeXWo8gdmJimpK67X6zJHFDYTAPCY20hRFthRkRObxu/fHYkUfJXNloZZMF5jgbzZVpKFa8PIdV0j+w7lnwMAgAz5PSc++WOrWW9UffSsSWyvTJZl6QUqlQD8DwBYbu2w9ERX1rvIePnh3j5e5P6d4iFLOC4iUzo1hMAlAACs8yAViwjft932XHvXs8ocx/rx/TsLJfAmWJ2OAQEA5s333CNl/V5nOffvFBz4xTYbtXfHh0pzQZYoAGCl7E8fucFQq9V815lrW7sNWQ/ftrRuqznodDGD/FAAwAYmECcu/nFeP6Akvr5bElReLXdq2PHBXsVxU28YCAAwz/3YyOtsiHPflcbSDtp4TGQHHRxAGBQAsOZm6NYmnUbNRkXqqEDU8jqNarXimkjO2X4YAFBuT1j/TVmj0SikXcdprz/QIdH8iQdoAKDUWhAecIGWk2PudqPhigZdS9LjSlgpBgBAc9vP5aJnO25yeloM8Z9P20btVmuVfgAAgPjHvu/rRLLdZw7TwtHLYazTbEBhAAAgLykNM6HieXiZ8VAYMPhVzyEWbDoAYDkMfNcp4NIMkU+Q0HIEdAAAYCmLeJ5XrJVRJfhNhudePiREAABMJmGqxzKHgWOTQu6yye/1ihujuSoZBgAote+bPrGs4tvHskoGCACwDAnp0K4Ck+faYAIBANapAsA5AACoyOQAAAAAS32Akiw5cXV2r8IBAPD8VMLeaWrCTdlgDwB4hOI4LgfipRuw0OARAABWIcdAog2KrfKYKnArdZMIAMASdyBVAkXmCzXZL2kEBiYQUEZhFJXN7QEnGCiR/wwFUVgqb2dVq1MAQOlI5caEUSn84OksQkY3aQAAkLwjDE2n06K7wIhKQvmRAiXUAwCAJTQJp8X3c2aReQ6AdDdIDAAAQlEUFV4S2rYNJQEAgJz9H4uO0KzXavzXX3+SE38RLa4ZZGPrrx+O+WKtzPnBBLpClJf9GbIIaVRr7+Q4DN0CscAnAWKqNnt/dNRqNsvcKw4AkNwIIk6GPhwdYnFTkgyZgu89F/nsw/Gha9mlnR0PANDErZ1+u+O5NkpmgZXBPuYqjmC0v9dHsjySQmvEMlOjUUOUSbFPUNFTxNJDYP7Qa7dLexYGAMio7ldRKvWLPkVCzX1Sc8D5Qpu1uoUJRXAOUF5nCNsWFmNhEtug+PYPxmlH7KrvUxrDOUB5SZVHlcgMYIYhhFDFsW1M4CS4xADQQtGSFSIl6JSP0wdZHGNbMSrj9CQAgKayFIKlCsAQ9kxrAgwaoLw0YzTb/RJ4ALmxAFjXAIEPUGbC0SwuL/5nJZ0cDADIaDwNyhkL54sOplPu9oAJVGp6mIzLZQMYJt94PAYTqOw0GU8zl7BMojCOWRhG5dx0AIABgHBazrTI+/t7qAkGEkVSD2GoQ0C4BEogsXduRw+xZASoByg7jUajTBaWwCnkC4wpur270z8S8AHKTTd3t3MB8uIv+f5OlsKJfjCqTB4AUFIiiASTMJrREhnEGJ+dX2bGEGiA0pJi+hmjw5vr8kQDr25HQRQxnLsJAIAyEmd6bgAQYg2vbkrCBXyZp2dnSuozWf8A5wClBgCSzRGCKHx4mCBU/NOAq9u7MI4F6zNREs3xjyEKVGITiKpGURiTq6urMiz59OwiLQET3F/KHkEAgEwHSEYQteGX9/eTIJSnAXT3gc3yP2qGv7gZRdFMiXzhAxDoDVp6J9iQgvh8eFUMc2BOrmOseoDis7OzWIl/ysq87wCAjFH0qAg5LP7q7jaIZur+pNHxnQ+S6LoX/PnkdJr0BhXLlocAAIDSKwGsuVx4hIidnp+lP85J091CgrpaORFJIPkhmF5d35p9UMo8Kg8AsEQVSNcQX9/eP4yDxYY5O9cy0WBrkezz55cTmixqbj4SnAOUm/WZDoenr/z+5WtMF81ojHaNUdS6OLC5bzOeBinTl3w6BgBg4XYk4XBpE+Mgir6enZrMrv2B3YmZaBaXKmschF/PL8yWpwADAMAcu1DF3KpBFrd1hlc313f3JkJ2zE7A2rOZxey33z9TpHu+Z2YP1n9KmAkHAFjGLyo0TnREiJvLf3w9uZ8EqQ7Iwim7tM/435+/TGN56Jsfjq3UHWagAYBWEKXs13//zh1ipFuG7pIPrHqA3tzej8fjMk+EBwB8uw0t+4bj3/78sqs90zG+vrsVSf+6FS5mGDYWALAp8whmiRkN49l4qucH79QpgKh5v30Yi9gtzhk/QACADW0gJn1fdHc3Uiy1U6cA6HZ0H8dULQQ2EwDw9HtECGcdipiund2tY2AkAlnYImbjWwxAAABsKv0RS8Pk42kwDWe7lTg5mgSjyYTGyvLRsV0gAMDTfIC0X8jw5nq3rv/88gLlo/6o3Ee/AIAnAkCyvuqbwI2hy5tblUO8dd4kNSrYkuEXQRDe3sueh+r4AunET/CDAQBPMaOTBCHRRSemF1fXerKQIUffnqWIbueFsn7/6KtMaAUCAHwH9+N5Rr+6ulHRFJPp39yoYHm7DYmGP6Ob0QPsIADgGdwAxesqkDIJgqvb+y21pBPzhkP09OwCIbD1AQDf7QOkJpCqmeT/n1xcxFuWOYaTv7CU/2fD6/F0CtsHAHh+VUAICcPwfHjJzGKrLZD9+kowCqP47PKitHXuAIAXtK6ZKinH+PxiOAmjtKLq7TGQxDeZrOOhlEGoBwDwHOzP5txLLVZjhP7882vaV2cr/AF5LWeXw/vxg9BUHBOwvQCA72F61SdryRtEXJ2NguDkbMhW8eLLhNuZ8fnpj/KLqEj7eQhOLoYsTe6n6vxCbTVe7AEKWgIAkPG0YhEh1I12mas8YyKn6l5cXt7cj5YbJPhF1AJODH0V7MeZ/iHTcPbH589pGwudwcFw6qjIt0nTKAED5IcCAAwMxFRxthKaabfQpSqCyH6aM8z++PxlEoTJv7z8CTHThj7KOx4hZf/6/Y8wniVdLXJmm8HoeK4TBJLZflvhxgAA3tKHZGj9aAyzeY5kFyqjooQ7A5zzgmkk34PNY+OXRIEAZnqRs1jUrAVRqAy2RQCrAG6mCpR5RvCcZw8AANMfpSF/USoubAXxumXwk2YjITSxMoQiSv/v37+JdqJGh/GX4iestk13MlXc/3+//ToJQ/VvJq/rTD6CHZHRTdVvpQ3wFssDoC9QiTUAzrxbkf5gCdbnVhFhbNDp/PjDh4PBIO8zZGKe/8qM0V9+E3XDJg+9ED9lH0sw1zwce+MgpJSmTC8HHZBE2LOGX/2v//jb+8MD33UVNhYdAH3UTUrHDzawfsJVgukFH1BZ9x7HlUql22n12h1iKYcWn51RlGcR5XGqkHskMPDH8dF+t9UiaVRemhbPa2BoxpXTHT//+TWMYyHkWe4NKTL55fq+ZxE06LT7nfbdw/j6+vbm7poiK7022emupN4wACDnBCsp2KrX+71OvVoxq6hqlYplWTOjm4hut2aIW+4T//nlZDweHx8ccp5L+f7ZzSH+yWfDq5OLS3nFWPJ5jFAOaZqtMfY8Ty0PI6tVq/I/UdQ/vbm/urqazWbKpdY6oXxucMEBYMZw5D4Txr1WOt/fSvENtxC4yO932zaX+ctspKrv3Ukjx2RrM37CvyIm+PLm7n40Pj46atX95MPZk61NtjyTjb88noZc8D8EQerFynR/7aJgYe2zNJZFKK37VfmmbFGO47wfdN/1uzej0cXl1UMwWSP6V2FDrgvter6dXXjWx0aRCEMzixKKUWYHCwcXN5rNXrfdqFZVy5+lFgv/uVar3cl2uY9Gk4Io+vWP32sV/2B/0KxV5czhJ7LKsjdzf/fscnhxeSkKdGSTkzm+JBILpuLiWstx7FVuT7tR538mYXR+Mby7u+OejBwKwjJHOf8VaQNtEQDAso3kjoeO8D/++XNRAaDSARIJnZbDplvLPNsRIr/TdexEPFOm3eFl+3o/CX7512+bTJNO0cWZtOr7+/v7rVolZ5887hVQUYmZvC2M4svrm8vhUNtgBKtoJlqWiWRGgeq+/5cf3uNlX5qL2GI8Y+j6+vpyeB1EIU2aQCo8Y8ooXrw+PVsANMBWIjtpYq6jHMoT1dzPWvUGdwob9do8E65l7qrH3QASrR2npYGnFRDmfDMKgtHvv1c9r91qNZv1iuPg7JCYLjWN0hQM/jZuTV3d3t0K8cykUysOcZlyPFbkopqZDvVaaobhpdyfAoZf1l63M+h0Rg/ji6vru/t7MUIGk5gzP1nC6ESpNfABthgC2VmPkGQIO9gadFrdLhf5VsoMzLA41gtmznK+78/G40dMICU0E5woLIyn0/H5+ZezM+5ptJr1arXqu9w7dfAy7o/jePQwuR9POBdGUSTcW4tQFbShIgfCIoTGNJPfZLkk5v/UqNaUp2LKexMMcz/yvzhmGvUq1zkcBtc3N9PZbJXxVoDjs8KaQFQayYJjYmqJTa0NuLnTrOf43dhF8+Qo21fKTJ3AXz+/uv4iKq1WErd5pIGOs3kzKCdo55imVqnYkpTJMZvNgiAI5akWxYk+SawRIpr15sKvc+bQopX///7+VwuTJfYP0o1Oc3pD/KyyObR/H1M0vLnlppeYp82Y2VYRM7bSWQEN8OZkyWCI59jdXrfX7riOpdkFz/M9lqp8UTqK5zmLSCQ+1Ot1fH5B6UrJR7HWACpZzeR+pRPUCAJEtHMymgZosXKL4PmLlFFXmlTkoCR/gT+PDZMsH7FhtUqVc39exivXQno6C0pAmPW63j+7jXtd7ia1rm5vL6+Gk/FUnYQk3tTO20CFBUDNd/f6g1a9hhMrJ3XYzDiPlv3pdMi16UCcPM+1MYlWj08VZjqXzTSXRMeE5SLglMldlojZtXFQbNrZMi2DvxKrkcaxHmxMdBsIvRAdDOVmEsK1Wg0Z53GmZkg1ITP4nawQ5xyP/Xar127dPYzPL4b343GCMQwAeL2oznIzF2dnUvI5q1f8w70Bt2IXQ4p4GXNvbMUSdb/4J1/djeZCLqmoJsKIYAuOAU5x+M1xUJykP8tYJzOCP1gjw0AL/zFmrFmtLayRrLonm1xQq1Zt1qrjcXA6vLgbjRkz9yWxm6SpFnP7k2UuSmKVYgDAN7u0WXxDZx8kIz71LWao6rj7e3vtRu3Z77MpQZvNpgmApdPmNv+0Z7xCgokZ/+GOcq1Wef6N4Nq1Wvmp+n48DYfDa+4nU20OZY54TDjOiIidSpMvMT63UV3smAmUWudzUTwb4YODQb/TSYxn+rx5fia/Nmv172TolxCEKi81c4G4u+JXX64sXsDAc2tH+0f7e1/PToe3dzHLjgXEZB1GUzkFJtAz20LiFksjWJU4Naq1j8dH3M012PEl3WsLVz1vPJ0+ie+fCpKFk+zM3Fr/FYlNSEXI6xlv+wpjybbwh6PDfr/PfQPuKEsnmptfwsun+QOT7YyZ7kz6q1mPkp5QcpZ/f3jwlx/ei6NcZloj5OUuQCiBRm0xZvpCu2sW8q6XpmYsiFvhrXrjeUX+0m9XL1Vd54fjg7//+EOn3hAxLktMGhfZtTiXPbGFfLUzAMhS1VWmF6X1SuVvf/006LR1bRSWEUj6UkrXPCrivLXYF/FR7nzSdWWz69jTDCf1/ornpSrx2e3PZa66GD9ZrXg/vT/69PEjIfLogW5R68jiaABhhCDU67b/8uNH30jz0okOJH/i/zLkVz3Hcb5hvO63XdomXzRXiVav1xO+fOYtSKNepgqQgR8dRG3X/f/89KnXapNEUWeH0NuHgl08B2CHh0eDTnPuqNYM8z859fLJ8RYRYr+9vV0E51rnwXJlTdZGkilpyx7HcRRFm1yVsv7lKRtqtVrPfhOWVnsyPH+izInLpQ/HB3yxJxfnHIN84XwVWFRI0G07Otg6AKhdxFRwmdhTSzu7ktFFUsMP7941m/XkLubiHHjJs5eyhXoNXwCAuyEsTgG36rBC/6KF//Onj7pOa+Mr/Ho+PL283ARjBMmsTYvYDNV9dz6R48XCQcvim+J7Dwddy8KfT05pWsGc94m3Yer41plAuTnV8lBJWf+a+z++V9z/5jeOawCMdQX60iSfReJSUA9j34wr1Ronk8kmtlOaasHlRafTwQvS4U1o0O0c7x8g1WEAz3sF32BDlgAASZWqSjdnmrOQ4v5Gzccb+50vSo5l1yq+1FJMpQYp5lvzK5xBQ2HMkCfcCoTGEgAbGWZEp/00G41tiL6roqODfqffbikmt7lvLHtyzaUeAgDmNxIZrZjVVf7w7rhZq5J87fbbCg8VDDV9u/XXwzd/+sSW5WE443pjwzcrDeBaVvMFDoC/hftVyhNl748Oe80237sZo2b7CUopeusI6TZGgVRrBlX5we8Rl/0fjzO7n7F4S2JqrXqDKNdz4+uZhNETboKoIggoXtLTcw2pJKg37/Sm74nOUmEfjw4avq/nOLH5/BFKKQAAmdJU5wzLpk6DfrfbrOEsDGc9KfbycuRX3IrnoKc0UwhMDUAfP9UKgnCxXGH1Zop/bbVaeAsOntJaBZR0Y/xwfOTadpoSN5fMAgDIO8FJYkm70TzcGyyJvm3HyaKINj6FJuF085xQlnjASXIHe/TWcSO7Va/J0oW31wC56SEYuY7149GREm1p+UF6TgwAmNcD/I/vuh+PD3Wf76Ua9o2vEjUajaxj+QZXpCL6qQfzOGCM3iebULvd3p5bZGaIqCXXq/7h3r7CQK5jDWiAvOBDhFkuJp9+eIdFvycRz97Gq8S0XvEqliMSvxB71BDiWz6bzUIV4kL00WDodBZPZ7Nksi9aX4El839Yv9VQJuS25WCmaSQH3VabeymJM4CThh1lBMAKE1BajHT27vjYsZ0Xymx7HpKJ8CrmuElXTVUpEgVTyaCPy7yAi/8V9t5Sl8B1Xd+vbJGGXAGFD8fvPGKp/G1ZxEZKagKly1aNXZP+JeLHvuxTlQozvI37qFstdDodkYG3wdRIaRaLwI7JoGv2fpy0nzC7+6sfzTBiiq5Ws7kTLRo47388PqI05npAmUOElNgESgPDKU94tn0w6OOtMvdX6/Wq5/AL3uQiuZnEdUYYhmwzZyaQczdSYW9iZvFFC6FOp7Ubs4+YiNX2Wk2zv2pJTaC5BEMV+Tk82JP5/fH2NytWHNjmlvcGAFALzJ+F0TU+xngyWS7s89Ew9bEVz/NdZxsCixsKjuODQ9eydDP6cjrBcz3p1Ul+3fe7rab8J2snJljxS+R+HdrABFLH2NOpeRZGVs0TCGMax3GWeEzmTaZsfr20IvqyLmJXSDSis8nx0QFZPYnwdcjehnthJga+O9hH8z08tnRnkx4nzPc9TkEUruN+2dOKrzGMosvrG8m+eE4DKJ6eSQqjeMaYxWWkkP2y6wlGaXo9ynf25HdPBUDn2r9tZx1Wem3tRr3TqF/fj+jbVQq8MQCSGT6a+/kuVn1vLvSxtdV0TM5JUgcArVYruLxYGzGSp1ni9EdkCKeBwdWrE2w9o/HSzGmz9aK6b+Y4AvTELhWvLDVUkq9qOvbu8Oh+9Eu0IAvK4gSrxECR/S94A70f9BcF/xZX0+H0HvZbOi9oeeGsGs8oI/rS6k16W6wzf7HRVjHlZv0V6mxYTTzlL+41a9tu9+fsf5QOouWG0KDfxRn3s/TOvI71+/ZRINGAUpwisV6n5Tx3GeureTKu63iua27tnMbPnksYVBzHd11rXToQmxs4qT8za4mlQgax73qqA9xu3bR0dfv9PveGE2mIXmPQ4DaYQMxsIyPPQvY6PbSDlBgbqNvtjk9P0/SvpT6Mclj5bv/Hp5+U879qh79eXJ1eXKRpM3owqmgHozp4JgVoFHWM9IcdumkCw/I//vxw0P/t5FRM3CDpfO9Hyut2XgPkotqYtZrNiufs3JC2VDZz6rVbthqxipYf3CKdsi9q6kVzf/58teFbr/k45f7E4mIpJR/vEMK/dxfVpmrqp5bX7bS4SjQHvJbCB9C7KPs4HHDrn6GdmzeSRlpEkyIL12s1grDZpM3IWchaNDdqorZBxn9X3v9G1VeNJ7JZjguzycTb6vVsvM2uqU3zx73BAGNt4JkDmgoLgLTlN3+se36l4m6JT/I9S+p32nRhfkz6Y/pP3GTXqmOts1j1/Wzc70K3F5V+t9frrq8r2HIlkMqIXrtZcdw5hVlkAOgdFRYz4xpQuj87yfamx1bn8liq8lTF5WZIqiJPhsQ0vg1W22jU1CQBZKQ/qA7Y6qNqnieixgTvLvenN5AvQrAByg19KngUKD3I7Ikipp3vNI9kmldTZKQZefCyuj+R6WLJXPwLjhUTBujaNdNGo2Ee92Z7xpBqFSO6P+A3i6B/x8bnOrmn6x10e7oEnCwZaVM0ABAd1kD9RksFOVAhaL9VV5Ww0rrTQU+GM6XX0BnL5LGbTyq2VbHt5Nd13rw4SZCa08K4r91fsmPBA5z8ya/XIrQn7h5SxTKk2D4A1YOEWIcrPrrzs9ZS8n1fDKbWI2SwzmajWrOLqanV6uaf1kgaT5iuhXKcuq02IWgbWus8Izd22+1seOGrmHZvbAJ5tlOtVlBRuF9Rl1smLFujjIomt5vgJx1ayTcrE8iiqbMrM8f3up0Csb6mqi+GZ+JXNOre1AlmopwKv7rj/+IAaDYcQiha4sl5nkfIEwREs1YnTHf8NN2ARrWmGlIUjDgzdNrNV1U6b2YCcRXHN1gNccBv38fmOe8pERUCKo1HzcxLDd5GvY6fIiMsC3ObCuV7MnOlsr/XRwyhwskOTp2mOE9UmrPgJpBt2w3DIC6SNhcBDYNf09fr9erTPojLiEbDvEWiZMLjbkaFIVa8+8bJdSyu3F5tUW8JAHHQg/OZXkUhvoV10T1XxGpwMoXVQrhSkSGgjdfKf9H3PXPkPRKDezsYFUpnzpHqtvQ6GHhLANSTJn7ZamkxdlRo771eP438KG1uWcR5UmRDnpRfX1+bVbNcbXbaLT0ZGGNUPAgwMd3j1bD9ZgCwKEvHLWZKgOAC7J+aldKoV6qex0SytzwKQCSM48vrGyrPgdboPWU5qX94mIY3ozFSmXAytHTUlYFCWRqgv61wjnDNcyuOUxAAmMfauTFHYlyKg15+yNzr71/awF2c7Se5DGp62enZBaN46ZJzvR50CQy6kBnRWpMgwm9at91ZvGmFsYXShSjXvwgAMFM+zP3mK8QYFW8LzY3sdzqenZNkEaVnl0Od37+w5DkRMJ5Mb+9GOCH+/n67zTEwl0ZWJD84XUijXsWscFEgc5/qNd9U34UKZTAzwauTvqrGhp5fXEzDGUNsPfKZGI50QY3iSVEz1OsuppFt/zDqbyAuH1nxAGAuqepVCHq8O9oOMn9uRZxlrSRcI4wZ7hIT8uX0DC1U/c2ZQw/B9O5hlCURMdTv9WwLL8IGv8ZczFe8d5Iqjmu/Sq+UN3OCvYpTSPHPVK5jUtrDWbbXUQOCZFKQCOfQu/v7u4fxuoMejE9Oz83OEUr870bfq+9j/vS+Oa/iB78NADgreLL6wZBktBgbmZaDpRx60BuIvi+q3InJsmCMv3w9m+uFk0ULEHp4mIwmE7MolvvTc5VfRT0EyESk5xUTAGKOlesu1ftFcgD0chjijNvttWXmhwhvik7AiARReD4cmrA3y0FPzs+kfmCGKdWfK5koZPDAJLcYGiCbb5U8iRmtuovdKEhhwqA5bMuQ/2G7YxGdFEQIthhF2Dq9vJqJgz9q7IV4zq2jURAShQg5U7ErOwaIKcBr4wq7fttUUCRdj20XwgdYLG02NUAZiK/Xtu1+p5u4wmIGuMjvp+zk7EJtgT75YuL5+cVQ9YvHmLO/ODHc3x9oGVH0GzVnJxfQBFJM4DgOKhOJthf9nmVpLSeCQZYICg2vbiZBaHpB96Px/fhB7X0ss+h63bbv2Kh8VEwAKA6YOx4qA9mWwEBW2KX0APeGT8+k3qeqLcDJ+QVjWeM0G+P9Qa/w/u5SsiyrgABQRlEZNMAi1+51u1XPE+JfWryqNf7deDy8vRP1f4xcjUajIMh6DTEu/ruumBP1SA8V0ABbDoD5vbNsXPj9W3RP+c+HB3tpnDTtfSBOfKW/K1wCkmUKOYTs93sI6WGiuGQAKOBJcLo07hSiUm5nu15TNUCMJTPiCI6i6PRyeH0/VsNj0vjmoN/lhhMq4rHXJvQ6c5PeJhWihEat6uTMt/XocF8nL8RpmS8+Gw5PTk/Vtmvx7ziDbm+u7rFUt61IAEiGwuoMXvK/v/0ZRXHxjoEfwwD36kjNc496XeEDWCQtAOK3YjKLxCkBwyr17XjQsci83bMDmoDpPxtC1cjko4oN0qaRs1nhNECK7CAI/vuXX75cXASzWF8Gy6sI029gxXEA1QIHg37Vq8x1AFdPZLM4VnO9XqeLdjHhOWl6hTfT81IVYj0cHclWGtLlfwimo4eH17jef/zz59e2BJIel1z+WRbpNFvtVqNZq+r2ZzjvOWM09/ImTLb97DKeTP/313/HBFtU9wjTA0ORaIHyt59+bPiV7R8S9f3iIF0XF4XjcTCeTMaSpCzArzAi4LUBsOpWuJbNYdBqtRqVSsr0RuiD7nbj6GUb//X84mQ45CtTzdPTMXjdduOHo6MdBfbmhlIcs/E04Lw+ephwi2A2m/HVzYz5x6oxcEEAsEkHP9UB08KkWau3mvVGtebKiUnbPPDwe1iAr/d//v3rJIj01CO5OBeTv//lk5n3v+WrXq2c8zJL8nE4jW4ngt0fHh6mYThjVMwGwpkFODcs8hVGBLyeBljcS6XxFdbV7CCSm50oqiJEq82aX6vwvz08BySmeizvkmYwwczXG1L28y//ohIAMePLR5/evWs26moA3m4DXvJuxA2byWTEDfoJ/3sSi4JonBd5Ga/r5l/49bj/jU0gFQVPhwSLWyATBJZqBpvharVaq1b4I/cgs3F6u8MoS3n6+n70x+cvM3kTOo3ax3fHeMVvbSkkDBWgDBsh4APB9Ny8iaIIoWz0ncnf61n81Rb7ZgAQRa4ok4VpN/20mfjcPUrnZvJXbJlfWfX9Wq3W8F3ZcHMH9ECSBGGwjfzr5PL65Py87vufPn6wyI7ptFnC8ZPJ9GE8ns5mpkmzAU8zI370Bq7OljjB3ytWXdfhQPArbqVS4frB8xz8rJ//0ntzfX3darVepD1MMolxAY5CLK8PruXWm3xOTBF3Xjm/P4w55weTMNxp/tl9ACST1dIXiFS4HAncUOKPFdcTJpPwK5e4bN/M06u0N3518Gx+PesE7xoZP6PT6fQ+mAp2n3CG184rklUNZMdzlHYeAAveguY2c2OItLA5FsQsPtd2HIdDgiuNVRJQjXBfyiBb65s+24UxFExD4bGG00kQcmEfxTOkYrRGQA8VJUOpUElpaShtrmlmTDAXWuFkPJoGSGaYKC0hu9O53Jfgj54tnnuei41jqSVf8TK7ruJgjzOx6XHm3/zNFxZJAa+sGi7jR9qkyQaVLq1FLg7PFEMDLIZK0mnV6TB6c9TuGgvCtWyOBF+igljI57rCsjlU1g923xJfYmW0Td8cFEQRZ3duxkyn0TixZ6TUwKkQecrlsV1P0959DSDraDGmS0W1OapIDl3LvS9/7KLfH1GuK0RXEpNZLZmeadt2xROP/HnFcfkjt6MIXs7T+hWWu57cxN+8G7rwCepKyaNYSj/ffJ1/dhTNOAkbRjB9xMU7fzJLJQXO7tQqLadOY1Y5C6pIAe94mlahfICX1jAJh7E0o0lWLRKFDf7IzRjfsfkjt6j0K+hpbduWSt9VIpm/znk6jtksjseh4HfJ61P+GMYz47fwoqe0knHJnKpMAMaKWZNQAB+AbRLMWH++aA6bmOvSnlpQmRRXUi85jY4YnYUhlaWMioH0PC+qEcLNJ9u2HCJ8DCIHO3IBrZ/LqRnmYUgKs9gYMcYNFXGGisTZn+BvSuM45uyepRXmLT19QwQrk8WBc/rMNR83So9ZCE2yOVlO8K84wNp5Ewg0AFCpicAtAAIAAAEBAICAAABAQAAAICAAABAQAAAICAAABAQAAAICAAABAQCAgAAAQEAAACAgAAAQEAAACAgAAAQEAAACAgAAAQEAgIAAAEBAAAAgIAAAEBAAAAgIAAAEBAAAAgIAAAEBAICA3o7+vwADAKus8Nh7Wb95AAAAAElFTkSuQmCC"

        if(firstName.length===0)
        { 
            cogoToast.error("Please Provide first name");
        }
        else if(lastName.length==0)
        {
            cogoToast.error("Please Provide last name");
        }
        else if(email.length==0 || !/\S+@\S+\.\S+/.test(email))
        {
            cogoToast.error("Please Provide a valid email address");
        }
        else if (mobile.length==0 )
        {
            cogoToast.error("Please Provide mobile number");
        }
        else if (password.length==0)
        {
            cogoToast.error("Please Provide password");
        }
        else if(role.length==0)
        {
            cogoToast.error("Please select user's role");
        }
        else if(accessibility.length==0)
        {
            cogoToast.error("Please provide user accessibility from the checkbox");
        }
        else
        {
            userRegistration(firstName,lastName,email,mobile,password,photo,role,accessibility).then
            (
                (res)=>
                {
                    if(res===true)
                    {
                        cogoToast.success("User Registration Success");

                        navigate('/')
                    }
                }
            )

            
        }
    }




    return (
        <Fragment>
            <section className='regi-section'>
                <div className='row'>
                    <div className='form'>
                        <form>
                            <h5>Create User</h5>
                            <div>
                                <input className='firstName' type="text" placeholder="First Name"/>
                            </div>
                            <div>
                                <input className='lastName' type="text" placeholder="Last Name"/>
                            </div>
                            <div>
                                <input className='email' type="text" placeholder="User email"/>
                            </div>
                            <div>
                                <input className='mobile' type="text" placeholder="Mobile"/>
                            </div>
                            <div>
                                <input className='password' type="password" placeholder="User Password"/>
                            </div>
                            <div >
                                <select className='selectRole'>
                                    <option value="">Select User Role</option>
                                    <option value="accountant">accountant</option>
                                    <option value="employee">employee</option>
                                    <option value="manager">manager</option>
                                    <option value="hr">HR</option>
                                </select>
                            </div>
                            <div className='access'>
                                <p><b>Select users accessibility</b></p>
                                <input className='checkBox' type= "checkbox" name= "access" value= "createUser" />Create New User <br/>
                                <input className='checkBox' type= "checkbox" name= "access" value= "dashboard" />Manage Dashboard <br/>
                                <input className='checkBox' type= "checkbox" name= "access" value= "customer" />Manage Customer <br/>
                                <input className='checkBox' type= "checkbox" name= "access" value= "supplier" />Manage Supplier <br/>
                                <input className='checkBox' type= "checkbox" name= "access" value= "expense" /> Manage Expense<br/>
                                <input className='checkBox' type= "checkbox" name= "access" value= "product" /> Manage Product<br/>
                                <input className='checkBox' type= "checkbox" name= "access" value= "purchase" /> Manage Purchase<br/>
                                <input className='checkBox' type= "checkbox" name= "access" value= "sell" /> Manage sell<br/>
                                <input className='checkBox' type= "checkbox" name= "access" value= "return" /> Manage Return<br/>
                                <input className='checkBox' type= "checkbox" name= "access" value= "report" /> Manage Report<br/>
                            </div>
                        </form>


                        <div>
                            <button onClick={registrationFunc}  className='next-btn'>Create User</button>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default Registration;