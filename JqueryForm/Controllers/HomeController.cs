using JqueryForm.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace JqueryForm.Controllers
{
    public class HomeController : Controller
    {
        private JQFormEntities1 db = new JQFormEntities1();
        public ActionResult Index()
        {
            List<Emp> emp = new List<Emp>();
            foreach (var item in db.Emps.ToList())
            {
                emp.Add(new Emp() {
                    EmpID = item.EmpID,
                    Name = item.Name,
                    Salary = item.Salary,
                    DOB = item.DOB,
                    Age = DateTime.Now.Year - item.DOB.Value.Year,
                    Language = item.Language
                });
            };
            return View(emp);
        }

        [HttpPost]
        public ActionResult Index(List<Emp> EmpData)
        {
            if (EmpData != null)
            {
                foreach (var item in EmpData)
                {
                    db.Emps.Add(item);
                }
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return RedirectToAction("Index");
        }

        public ActionResult AddRow()
        {
            return PartialView("_AddRecord");
        }

        [HttpPost, ActionName("Delete")]
        public ActionResult Delete(List<int> EmpId)
        {
            if(EmpId != null)
            {
                foreach(var item in EmpId)
                {
                    Emp emp = db.Emps.Find(item);
                    db.Emps.Remove(emp);
                }
            }
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Emp emp = db.Emps.Find(id);
            if (emp == null)
            {
                return HttpNotFound();
            }
            return PartialView("_NewEditRecord", emp);
        }

        [HttpPost]
        public ActionResult Edit([Bind(Include = "EmpID,Name,Salary,DOB,Age,Language")] List<Emp> emp)
        {
            if (ModelState.IsValid)
            {   
                foreach (var item in emp)
                {   
                    var data = db.Emps.First(x => x.EmpID == item.EmpID);
                    data.Name = item.Name;
                    data.Salary = item.Salary;
                    data.DOB = item.DOB;
                    data.Age = item.Age;
                    data.Language = item.Language;
                    db.SaveChanges();
                }
                return RedirectToAction("Index");
            }
            return RedirectToAction("Index");
        }
    }
}